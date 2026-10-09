import type { FaixaSalarial } from '../data/mercado'

type SalaryTableProps = {
  rows: FaixaSalarial[]
}

export default function SalaryTable({ rows }: SalaryTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-sm ring-1 ringbrand-400/20">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-brand-900 font-mono text-xs uppercase tracking-widest text-white">
          <tr>
            <th className="px-6 py-4 font-medium">Nível</th>
            <th className="px-6 py-4 font-medium">Faixa salarial (CLT)</th>
            <th className="px-6 py-4 font-medium">Perfil</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row) => (
            <tr key={row.level} className="border-b border-brand-400/10 last:border-b-0 even:bg-surface/50">
              <td className="px-6 py-4 font-semibold text-brand-900">{row.level}</td>
              <td className="px-6 py-4 font-mono font-semibold text-brand-600">{row.range}</td>
              <td className="px-6 py-4 text-slate-600">{row.profile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}