import type { ReactNode } from 'react'

type CtaBannerProps = {
  title: string
  text: ReactNode
}

export default function CtaBanner({ title, text }: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl bg-brand-900 px-6 py-12 text-center shadow-xl md:px-12">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-violet-200">{text}</p>
      </div>
    </section>
  )
}