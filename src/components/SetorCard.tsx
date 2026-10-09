import type { Setor } from '../data/mercado'

export default function SetorCard({
  icon,
  title,
  description,
  companies,
  roles,
}: Setor) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-bold text-brand-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      <p className="mt-5 font-mono text-[11px] tracking-widest text-brand-400">
        EMPRESAS
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {companies.map((company) => (
          <span
            key={company}
            className="rounded-md bg-brand-400/15 px-2 py-1 font-mono text-xs text-brand-700"
          >
            {company}
          </span>
        ))}
      </div>

      <p className="mt-5 font-mono text-[11px] tracking-widest text-brand-400">
        CARGOS TÍPICOS
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </article>
  )
}