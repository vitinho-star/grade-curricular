import { useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { AuthContext, type AuthContextValue } from './auth-context'

function traduzErro(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials'))
    return 'E-mail ou senha incorretos.'
  if (m.includes('already registered')) return 'Este e-mail já tem cadastro.'
  if (m.includes('email not confirmed'))
    return 'Confirme seu e-mail antes de entrar.'
  if (m.includes('password'))
    return 'A senha deve ter pelo menos 6 caracteres.'
  return 'Não foi possível concluir. Tente novamente.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_evento, session) => {
        setUser(session?.user ?? null)
      },
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const value: AuthContextValue = {
    user,
    loading,

    async signIn(email, password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error: error ? traduzErro(error.message) : null }
    },

    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return { error: traduzErro(error.message) }
      return { error: null, precisaConfirmar: !data.session }
    },

    async signOut() {
      await supabase.auth.signOut()
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}