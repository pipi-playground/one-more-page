'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, UserBook } from '@/lib/supabase'
import { useUser } from '@/hooks/use-user'
import { ChatInterface } from '@/components/chat/chat-interface'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const userId = useUser()
  const [userBook, setUserBook] = useState<UserBook | null>(null)

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const { data } = await supabase
        .from('user_books')
        .select('*, book:books(*)')
        .eq('id', id)
        .eq('user_id', userId)
        .single()
      if (data) setUserBook(data as UserBook)
    })()
  }, [userId, id])

  if (!userBook) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  const book = userBook.book!

  return (
    // 모바일: 하단 바(4rem) 제외한 높이, 데스크탑: 전체 화면 높이
    <div className="flex flex-col h-[calc(100dvh-4rem)] md:h-screen overflow-hidden">
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b shrink-0">
        <Link href={`/books/${id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-bold text-base line-clamp-1">{book.title}</h1>
          <p className="text-xs text-muted-foreground">AI 독서 친구와 토론하기</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden px-4 pb-4 max-w-3xl mx-auto w-full">
        <ChatInterface book={book} userBookId={id} />
      </div>
    </div>
  )
}
