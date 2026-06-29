'use client'

import { useEffect, useState } from 'react'
import { PublicHighlight } from '@/lib/supabase'
import { useUser } from '@/hooks/use-user'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function PublicHighlightsPage() {
  const userId = useUser()
  const [highlights, setHighlights] = useState<PublicHighlight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const res = await fetch('/api/highlights/public')
      if (res.ok) {
        const data = await res.json()
        setHighlights((data as PublicHighlight[]).filter((h) => h.user_id !== userId))
      }
      setLoading(false)
    })()
  }, [userId])

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">독자들의 하이라이트</h1>
        <p className="text-muted-foreground mt-1">다른 독자들이 공유한 인상 깊은 구절들이에요</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : highlights.length === 0 ? (
        <div className="text-center py-16 space-y-2">
          <p className="text-4xl">📖</p>
          <p className="font-medium">아직 공유된 하이라이트가 없어요</p>
          <p className="text-sm text-muted-foreground">하이라이트를 추가할 때 공개로 설정해보세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((h) => (
            <PublicHighlightCard key={h.id} highlight={h} />
          ))}
        </div>
      )}
    </div>
  )
}

function PublicHighlightCard({ highlight: h }: { highlight: PublicHighlight }) {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden">
      <div className="bg-primary/5 border-b px-4 py-3">
        <p className="font-semibold text-sm leading-snug line-clamp-1">{h.book.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{h.book.author}</p>
      </div>
      <CardContent className="pt-4 pb-4 space-y-2 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {h.page_number && <span className="font-medium text-primary">p.{h.page_number}</span>}
          <span>{formatDate(h.created_at)}</span>
        </div>
        <blockquote className="text-sm italic leading-relaxed text-foreground/80 line-clamp-4">
          {h.content}
        </blockquote>
        {h.note && (
          <p className="text-xs text-muted-foreground pl-2 border-l-2 border-primary/30 line-clamp-2">
            {h.note}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
