import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Noticia } from '../data/noticias'

export function useNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false
    const hoje = new Date().toLocaleDateString('sv-SE') // aaaa-mm-dd, no fuso local

    supabase
      .from('noticias')
      .select('*')
      .eq('publicada', true)
      .order('fixada', { ascending: false })
      .order('data', { ascending: false })
      .then(({ data, error }) => {
        if (cancelado) return

        if (error) {
          setErro('Não foi possível carregar os avisos.')
        } else {
          const lista = (data ?? []) as Noticia[]
          setNoticias(lista.filter((n) => !n.expira_em || n.expira_em >= hoje))
        }
        setCarregando(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  return { noticias, carregando, erro }
}