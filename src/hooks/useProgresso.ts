import { useEffect, useState } from 'react'
import type { Status } from '../data/disciplinas'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

type Progresso = Record<string, Status>

export function useProgresso() {
  const { user } = useAuth()
  const userId = user?.id

  const [progresso, setProgresso] = useState<Progresso>({})
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    let cancelado = false

    supabase
      .from('progresso')
      .select('codigo, status')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (cancelado) return

        if (error) {
          setErro('Não foi possível carregar seu progresso.')
        } else {
          const mapa: Progresso = {}
          for (const linha of data ?? []) {
            mapa[linha.codigo] = linha.status as Status
          }
          setProgresso(mapa)
        }
        setCarregando(false)
      })

    return () => {
      cancelado = true
    }
  }, [userId])

  function getStatus(codigo: string): Status {
    return progresso[codigo] ?? 'nao-cursada'
  }

  async function setStatus(codigo: string, status: Status) {
    if (!userId) return

    const anterior = progresso[codigo]

    // Atualiza a tela na hora, sem esperar o servidor
    setProgresso((atual) => ({ ...atual, [codigo]: status }))
    setErro(null)

    const { error } = await supabase.from('progresso').upsert(
      {
        user_id: userId,
        codigo,
        status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,codigo' },
    )

    // Se o servidor recusar, desfaz a mudança na tela
    if (error) {
      setProgresso((atual) => {
        const copia = { ...atual }
        if (anterior) copia[codigo] = anterior
        else delete copia[codigo]
        return copia
      })
      setErro('Não foi possível salvar. Tente novamente.')
    }
  }

  return { getStatus, setStatus, carregando, erro }
}