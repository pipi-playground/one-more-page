'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'info'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    const supabase = createClient()

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage({ type: 'error', text: '이메일 또는 비밀번호가 올바르지 않습니다.' })
      } else {
        router.push('/')
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'info', text: '가입이 완료되었습니다! 이메일 인증 후 로그인해주세요.' })
      }
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center space-y-2">
        <div className="text-4xl">📖</div>
        <CardTitle className="text-xl">One More Page</CardTitle>
        <CardDescription>나만의 독서 기록 & AI 독서 친구</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 탭 */}
        <div className="flex rounded-lg bg-muted p-1 text-sm">
          <button
            onClick={() => { setMode('login'); setMessage(null) }}
            className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
              mode === 'login' ? 'bg-background shadow-sm' : 'text-muted-foreground'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => { setMode('signup'); setMessage(null) }}
            className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
              mode === 'signup' ? 'bg-background shadow-sm' : 'text-muted-foreground'
            }`}
          >
            회원가입
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />

          {message && (
            <p className={`text-xs px-1 ${message.type === 'error' ? 'text-destructive' : 'text-primary'}`}>
              {message.text}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {mode === 'login' ? '로그인' : '회원가입'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
