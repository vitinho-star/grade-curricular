import type { Recurso } from '../data/links'

export default function RecursoCard({
  initials,
  tag,
  name,
  fullName,
  description,
  url,
}: Recurso) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 font-bold text-white">
          {initials}
        </div>
        <span className="rounded-full bg-brand-400/15 px-3 py-1 font-mono text-[11px] text-brand-700">
          {tag}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-brand-900">{name}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-600">{fullName}</p>
      <p className="mt-3 flex-1 text-sm text-slate-600">{description}</p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block self-start rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Acessar site ↗
      </a>
    </article>
  )
}