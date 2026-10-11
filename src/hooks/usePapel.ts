import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export type Papel = 'editor' | 'admin' | null

export function usePapel() {
  const { user, loading: carregandoAuth } = useAuth()
  const userId = user?.id

  const [resultado, setResultado] = useState<{
    userId: string
    papel: Papel
  } | null>(null)

  useEffect(() => {
    if (!userId) return

    let cancelado = false

    supabase
      .from('editores')
      .select('papel')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelado) return
        setResultado({ userId, papel: (data?.papel as Papel) ?? null })
      })

    return () => {
      cancelado = true
    }
  }, [userId])

  const papel: Papel =
    userId && resultado?.userId === userId ? resultado.papel : null
  const carregando =
    carregandoAuth || (!!userId && resultado?.userId !== userId)

  return {
    papel,
    carregando,
    eEditor: papel !== null,
    eAdmin: papel === 'admin',
  }
}