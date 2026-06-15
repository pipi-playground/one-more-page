import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export function getClaudeClient() {
  return client
}

export function buildBookContext(title: string, author: string, description: string) {
  const trimmed = description?.slice(0, 300) ?? ''
  return `책 제목: ${title}\n저자: ${author}\n책 소개: ${trimmed}`
}
