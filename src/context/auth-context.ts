import { createContext } from 'react'
import type { User } from '@supabase/supabase-js'

export type AuthResult = {
  error: string | null
  precisaConfirmar?: boolean
}

export type AuthContextValue = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)