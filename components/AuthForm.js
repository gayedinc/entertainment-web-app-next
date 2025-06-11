'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { createClient } from '@/supabase/client'

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const isLogin = mode === 'login'

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return toast.error(error.message)
      }

      toast.success('Başarıyla giriş yapıldı!')
      router.push('/homepage')
      router.refresh()
    } else {
      if (password !== repeatPassword) {
        return toast.error('Şifreler eşleşmiyor!')
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return toast.error(error.message)
      }

      toast.success('Hesabınız başarıyla oluşturuldu! Lütfen giriş yapın.')
      router.push('/login')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <Image 
          src="/img/movie-login-icon.svg" 
          alt="App Logo"
          width={32}
          height={32}
        />
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Repeat Password"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        )}

        <button type="submit">
          {isLogin ? 'Login to your account' : 'Create an account'}
        </button>

        <p className="auth-footer">
          {isLogin ? (
            <>
              Don&apos;t have an account? <a href="/signup">Sign Up</a>
            </>
          ) : (
            <>
              Already have an account? <a href="/login">Login</a>
            </>
          )}
        </p>
      </form>
    </div>
  )
}