'use client'
import { createContext, useState, useEffect } from 'react'
import { createClient } from '@/supabase/client'

export const UserContext = createContext({ user: null })

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}