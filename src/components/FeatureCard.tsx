type FeatureCardProps = {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl bg-brand-700 p-5 text-white">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-violet-200">{description}</p>
    </div>
  )
}