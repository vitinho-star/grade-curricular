import type { Noticia } from '../data/noticias'
import { tiposInfo } from '../data/noticias'

function formatarData(data: string): string {
  return new Date(`${data}T00:00:00`).toLocaleDateString('pt-BR')
}

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const tipo = tiposInfo[noticia.tipo]
  const linkSeguro = noticia.link && /^https?:\/\//i.test(noticia.link)

  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 font-mono text-[11px] ${tipo.badge}`}
        >
          {tipo.label}
        </span>
        {noticia.fixada && (
          <span className="rounded-full bg-brand-900 px-3 py-1 font-mono text-[11px] text-white">
            Fixado
          </span>
        )}
        <time
          dateTime={noticia.data}
          className="ml-auto font-mono text-xs text-slate-500"
        >
          {formatarData(noticia.data)}
        </time>
      </div>

      <h3 className="mt-4 text-lg font-bold text-brand-900">{noticia.titulo}</h3>
      <p className="mt-2 flex-1 whitespace-pre-line text-sm text-slate-600">
        {noticia.texto}
      </p>

      {linkSeguro && (
        <a
          href={noticia.link!}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block self-start text-sm font-semibold text-brand-600"
        >
          Saiba mais ↗
        </a>
      )}
    </article>
  )
}