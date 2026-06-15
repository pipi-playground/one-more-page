import { NextResponse } from 'next/server'
import { aladinFetch, parseAladinResponse } from '@/lib/aladin'

function buildListUrl(queryType: string, ttbKey: string) {
  const url = new URL('https://www.aladin.co.kr/ttb/api/ItemList.aspx')
  url.searchParams.set('TTBKey', ttbKey)
  url.searchParams.set('QueryType', queryType)
  url.searchParams.set('MaxResults', '10')
  url.searchParams.set('start', '1')
  url.searchParams.set('SearchTarget', 'Book')
  url.searchParams.set('output', 'js')
  url.searchParams.set('Version', '20131101')
  url.searchParams.set('Cover', 'Big')
  return url
}

export async function GET() {
  const ttbKey = process.env.ALADIN_TTB_KEY!

  const [bestsellerText, blogBestText] = await Promise.all([
    aladinFetch(buildListUrl('Bestseller', ttbKey)),
    aladinFetch(buildListUrl('BlogBest', ttbKey)),
  ])

  const data = {
    bestseller: parseAladinResponse(bestsellerText).item ?? [],
    recommended: parseAladinResponse(blogBestText).item ?? [],
  }

  return NextResponse.json(data, {
    headers: {
      // Vercel CDN이 1시간 캐싱, 이후 24시간은 stale 데이터 즉시 반환하며 백그라운드 갱신
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
