export type TipoNoticia = 'noticia' | 'aviso' | 'evento' | 'prazo'

export type Noticia = {
  id: string
  titulo: string
  texto: string
  tipo: TipoNoticia
  data: string
  link: string | null
  fixada: boolean
  publicada: boolean
  expira_em: string | null
  autor_id: string | null
  criado_em: string
}

export const tiposInfo: Record<
  TipoNoticia,
  { label: string; plural: string; badge: string }
> = {
  noticia: {
    label: 'Notícia',
    plural: 'Notícias',
    badge: 'bg-brand-400/15 text-brand-700',
  },
  aviso: {
    label: 'Aviso',
    plural: 'Avisos',
    badge: 'bg-amber-100 text-amber-700',
  },
  evento: {
    label: 'Evento',
    plural: 'Eventos',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  prazo: {
    label: 'Prazo',
    plural: 'Prazos',
    badge: 'bg-rose-100 text-rose-700',
  },
}