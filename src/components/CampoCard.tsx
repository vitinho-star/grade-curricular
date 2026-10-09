import type { Campo } from '../data/home'

export default function CampoCard({ icon, title, description }: Campo) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 font-bold text-brand-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  )
}