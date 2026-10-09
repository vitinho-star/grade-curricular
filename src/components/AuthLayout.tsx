import type { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <section className="mx-auto flex max-w-md px-6 py-16">
      <div className="w-full rounded-2xl bg-white p-8 shadow-xl ring-1 ring-brand-400/20">
        <p className="font-mono text-xs tracking-widest text-brand-600">
          ÁREA DO ALUNO
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-brand-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}