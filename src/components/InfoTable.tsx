import type { InfoRow } from '../data/curso'

type InfoTableProps = {
  rows: InfoRow[]
}

export default function InfoTable({ rows }: InfoTableProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex justify-between gap-4 border-b border-brand-400/20 py-3 last:border-b-0"
        >
          <span className="text-sm text-slate-500">{row.label}</span>
          <span className="text-right font-mono text-sm font-semibold text-brand-900">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}