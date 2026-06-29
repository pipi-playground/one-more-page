export async function aladinFetch(url: URL): Promise<string> {
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Aladin API error: ${res.status}`)
  return res.text()
}

export function parseAladinResponse(raw: string) {
  const cleaned = raw.replace(/^[^{]*/, '').replace(/[^}]*$/, '')
  return JSON.parse(cleaned)
}

export type AladinBook = {
  isbn: string
  isbn13: string
  title: string
  author: string
  publisher: string
  cover: string
  description: string
  categoryName: string
  pubDate: string
  itemPage: number
  link: string
}

export type AladinSearchResponse = {
  item: AladinBook[]
  totalResults: number
}
