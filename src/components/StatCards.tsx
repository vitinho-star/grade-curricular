import type { Stat } from '../data/mercado'

export default function StatCard({ value, label, note }: Stat) {
  return (
    <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-brand-400/20">
      <p className="text-3xl font-extrabold text-brand-600">{value}</p>
      <p className="mt-2 text-sm font-semibold text-brand-900">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  )
}