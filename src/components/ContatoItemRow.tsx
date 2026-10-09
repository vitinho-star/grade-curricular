import type { ContatoItem } from '../data/contato'

export default function ContatoItemRow({ icon, label, value }: ContatoItem) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-400/15 text-lg">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-brand-400">
          {label}
        </p>
        <p className="mt-1 text-sm text-slate-700">{value}</p>
      </div>
    </div>
  )
}