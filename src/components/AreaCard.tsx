import type { Area } from '../data/areas'

export default function AreaCard({ icon, title, description }: Area) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/15 text-xl">
        {icon}
      </div>

      <h3 className="mt-4 text-base font-bold text-brand-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-600">
        {description}
      </p>
    </article>
  )
}