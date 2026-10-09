import { statusInfo, statusList } from '../lib/status'

export default function StatusLegend() {
  return (
    <div className="mt-10 rounded-xl bg-white p-5 ring-1 ring-brand-400/20">
      <p className="font-mono text-[11px] uppercase tracking-widest text-brand-400">
        Legenda de status
      </p>

      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
        {[...statusList].reverse().map((status) => (
          <li key={status} className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${statusInfo[status].dot}`}
            />
            {statusInfo[status].icon} {statusInfo[status].label}
          </li>
        ))}

        <li className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
            ✓
          </span>
          Semestre completo
        </li>
      </ul>
    </div>
  )
}