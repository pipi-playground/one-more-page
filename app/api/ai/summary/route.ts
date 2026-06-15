import { NextRequest, NextResponse } from 'next/server'
import { getClaudeClient, buildBookContext } from '@/lib/claude'

const summarySchema = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    reading_plan: {
      type: 'object',
      properties: {
        daily_minutes: { type: 'number' },
        weeks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              week: { type: 'number' },
              pages: { type: 'string' },
              goal: { type: 'string' },
              tips: { type: 'array', items: { type: 'string' } },
            },
            required: ['week', 'pages', 'goal', 'tips'],
            additionalProperties: false,
          },
        },
        questions: { type: 'array', items: { type: 'string' } },
      },
      required: ['daily_minutes', 'weeks', 'questions'],
      additionalProperties: false,
    },
  },
  required: ['summary', 'reading_plan'],
  additionalProperties: false,
}

export async function POST(req: NextRequest) {
  const { title, author, description, totalPages } = await req.json()
  const client = getClaudeClient()
  const bookCtx = buildBookContext(title, author, description)

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    output_config: { format: { type: 'json_schema', schema: summarySchema } },
    system: '당신은 독서 전문가이자 친근한 독서 멘토입니다. 요청한 JSON 형식으로만 응답하세요.',
    messages: [
      {
        role: 'user',
        content: `다음 책에 대해 요약과 독서 루틴을 작성해주세요.\n\n${bookCtx}\n총 페이지: ${totalPages || '미상'}\n\n- summary: 3~5문장 핵심 요약\n- reading_plan.daily_minutes: 하루 권장 독서 시간(분)\n- reading_plan.weeks: 주차별 목표 (최대 4주)\n- reading_plan.questions: 읽으면서 생각해볼 질문 5개`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const parsed = JSON.parse(text)
  return NextResponse.json(parsed)
}
