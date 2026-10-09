import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Página não encontrada', 'A página que você procura não existe.')

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-widest text-brand-600">
        ERRO 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold text-brand-900">
        Página não encontrada
      </h1>
      <p className="mt-4 text-slate-600">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
      >
        Voltar para o início
      </Link>
    </section>
  )
}