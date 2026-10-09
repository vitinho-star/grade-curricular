type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle: string
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section
      className="relative flex min-h-[320px] w-full items-center justify-center bg-cover bg-center px-6 py-12"
      style={{ backgroundImage: "url('/fundo.jpg')" }}
    >
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white px-8 py-8 text-center shadow-lg">
        <p className="font-mono text-xs tracking-[0.25em] text-brand-700">
          {eyebrow}
        </p>

        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-brand-900">
          {title}
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          {subtitle}
        </p>
      </div>
    </section>
  )
}