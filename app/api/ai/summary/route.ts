import { NextRequest, NextResponse } from 'next/server'
import { getClaudeClient, buildBookContext } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const { title, author, description, totalPages } = await req.json()
    const client = getClaudeClient()
    const bookCtx = buildBookContext(title, author, description)

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: `당신은 독서 전문가이자 친근한 독서 멘토입니다. 반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록, 설명 텍스트 없이 JSON만 출력하세요.

{
  "summary": "3~5문장 핵심 요약",
  "reading_plan": {
    "daily_minutes": 30,
    "weeks": [
      { "week": 1, "pages": "1~100", "goal": "주차 목표", "tips": ["팁1", "팁2"] }
    ],
    "questions": ["질문1", "질문2", "질문3", "질문4", "질문5"]
  }
}`,
      messages: [
        {
          role: 'user',
          content: `다음 책에 대해 요약과 독서 루틴을 JSON으로 작성해주세요.\n\n${bookCtx}\n총 페이지: ${totalPages || '미상'}\n\n- summary: 3~5문장 핵심 요약\n- reading_plan.daily_minutes: 하루 권장 독서 시간(분)\n- reading_plan.weeks: 주차별 목표 (최대 4주)\n- reading_plan.questions: 읽으면서 생각해볼 질문 5개`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    // 코드블록이 있으면 제거
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    const parsed = JSON.parse(cleaned)
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('[summary] error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'AI 요약 실패' },
      { status: 500 }
    )
  }
}
