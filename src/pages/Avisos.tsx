import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import NoticiaCard from '../components/NoticiaCard'
import { tiposInfo, type TipoNoticia } from '../data/noticias'
import { useNoticias } from '../hooks/useNoticias'
import { usePageMeta } from '../hooks/usePageMeta'

type Filtro = 'todos' | TipoNoticia

const filtros: { value: Filtro; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  ...(Object.keys(tiposInfo) as TipoNoticia[]).map((tipo) => ({
    value: tipo,
    label: tiposInfo[tipo].plural,
  })),
]

export default function Avisos() {
  usePageMeta(
    'Avisos',
    'Comunicados, eventos, prazos e novidades do curso de Engenharia de Produção e do centro acadêmico.',
  )

  const { noticias, carregando, erro } = useNoticias()
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const visiveis = noticias.filter((n) => filtro === 'todos' || n.tipo === filtro)

  return (
    <>
      <PageHeader
        eyebrow="MURAL"
        title="Avisos e Novidades"
        subtitle="Acompanhe os comunicados, eventos e prazos do curso e do centro acadêmico."
      />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFiltro(f.value)}
              aria-pressed={filtro === f.value}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filtro === f.value
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-brand-400/20 hover:ring-brand-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {carregando && (
          <p role="status" className="mt-8 text-center text-slate-500">
            Carregando avisos...
          </p>
        )}

        {erro && (
          <p
            role="alert"
            className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {erro}
          </p>
        )}

        {!carregando && !erro && visiveis.length === 0 && (
          <p className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-brand-400/20">
            Nenhum aviso por aqui no momento.
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visiveis.map((noticia) => (
            <NoticiaCard key={noticia.id} noticia={noticia} />
          ))}
        </div>
      </section>
    </>
  )
}