import { NextRequest } from 'next/server'
import { getClaudeClient, buildBookContext } from '@/lib/claude'
import { ChatMessage } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { title, author, description, messages, userMessage } = await req.json()
  const client = getClaudeClient()
  const bookCtx = buildBookContext(title, author, description)

  const recentMessages = (messages as ChatMessage[]).slice(-10)
  const history = recentMessages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const response = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 256,
        system: `당신은 "${title}"을 함께 읽은 독서 친구입니다. 독자와 이 책에 대해 깊이 있는 대화를 나눕니다. 공감하고, 질문하고, 다양한 관점을 제시하세요. 답변은 짧고 대화체로, 150자 이내로 유지하세요. 책 배경 지식: ${bookCtx}`,
        messages: [
          ...history,
          { role: 'user', content: userMessage },
        ],
        stream: true,
      })

      for await (const event of response) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(event.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
