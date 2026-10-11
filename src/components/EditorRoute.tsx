import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePapel } from '../hooks/usePapel'

export default function EditorRoute() {
  const { user, loading } = useAuth()
  const { eEditor, carregando } = usePapel()
  const location = useLocation()

  if (loading || carregando) {
    return (
      <p role="status" className="px-6 py-24 text-center text-slate-500">
        Verificando permissão...
      </p>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!eEditor) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest text-brand-600">
          ACESSO RESTRITO
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-brand-900">
          Você não tem permissão
        </h1>
        <p className="mt-4 text-slate-600">
          Esta área é exclusiva para editores dos avisos. Se você deveria ter
          acesso, peça a um administrador.
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

  return <Outlet />
}