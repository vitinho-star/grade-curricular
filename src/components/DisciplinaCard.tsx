import type { Disciplina, Status } from '../data/disciplinas'
import { statusInfo } from '../lib/status'

type DisciplinaCardProps = {
  disciplina: Disciplina
  status: Status
  onClick: () => void
}

export default function DisciplinaCard({
  disciplina,
  status,
  onClick,
}: DisciplinaCardProps) {
  const info = statusInfo[status]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full flex-col rounded-xl border-t-4 bg-white p-4 text-left shadow-sm ring-1 ring-brand-400/20 transition hover:-translate-y-0.5 hover:shadow-md ${info.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-brand-900">
          {disciplina.nome}
        </h3>
        <span
          title={info.label}
          aria-label={info.label}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${info.badge}`}
        >
          {info.icon}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-slate-500">
{disciplina.codigo}
{disciplina.horas > 0 && ` · ${disciplina.horas}h`}        </span>
        <span className="rounded-md bg-brand-400/15 px-2 py-0.5 font-mono text-[11px] text-brand-700">
          {disciplina.categoria}
        </span>
      </div>
    </button>
  )
}