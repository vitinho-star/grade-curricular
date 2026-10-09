type StatsBarProps = {
  total: number
  concluidas: number
  emAndamento: number
}

export default function StatsBar({
  total,
  concluidas,
  emAndamento,
}: StatsBarProps) {
  const naoCursadas = total - concluidas - emAndamento
  const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100)

  const numeros = [
    { label: 'Concluídas', value: concluidas, color: 'text-emerald-400' },
    { label: 'Em andamento', value: emAndamento, color: 'text-brand-400' },
    { label: 'Não cursadas', value: naoCursadas, color: 'text-violet-200' },
    { label: 'Total', value: total, color: 'text-white' },
  ]

  return (
    <div className="rounded-2xl bg-brand-900 p-6 text-white shadow-xl">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div>
          <p className="text-4xl font-extrabold">{percentual}%</p>
          <p className="font-mono text-[11px] text-violet-200">concluído</p>
        </div>

        {numeros.map((n) => (
          <div key={n.label}>
            <p className={`text-xl font-bold ${n.color}`}>{n.value}</p>
            <p className="text-xs text-violet-200">{n.label}</p>
          </div>
        ))}
      </div>

      <div
        role="progressbar"
        aria-valuenow={percentual}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-5 h-2 overflow-hidden rounded-full bg-white/20"
      >
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${percentual}%` }}
        />
      </div>

      <p className="mt-2 font-mono text-xs text-violet-200">
        {concluidas} de {total} disciplinas concluídas
      </p>
    </div>
  )
}