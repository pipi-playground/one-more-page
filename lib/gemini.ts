import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export function getGeminiModel(maxOutputTokens = 512) {
  return genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: { maxOutputTokens },
  })
}

export function buildBookContext(title: string, author: string, description: string) {
  const trimmed = description?.slice(0, 300) ?? ''
  return `책 제목: ${title}\n저자: ${author}\n책 소개: ${trimmed}`
}
