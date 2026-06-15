'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useUser() {
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? '')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserId(session?.user?.id ?? '')
    })

    return () => subscription.unsubscribe()
  }, [])

  return userId
}
