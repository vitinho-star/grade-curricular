type ObjetivoCardProps = {
  number: number
  title: string
  description: string
}

export default function ObjetivoCard({
  number,
  title,
  description,
}: ObjetivoCardProps) {
  return (
    <div className="rounded-xl bg-white/10 p-5">
      <p className="font-mono text-xs text-brand-400">
        {String(number).padStart(2, '0')}
      </p>
      <h3 className="mt-2 text-sm font-bold text-white">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-violet-200">{description}</p>
    </div>
  )
}