import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../hooks/useAuth'
import { authInputClass, authLabelClass } from '../lib/formStyles'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Login() {
  usePageMeta(
    'Entrar',
    'Entre na sua conta para acompanhar a grade curricular.',
  )
  const { user, loading, signIn } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/grade'

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)

    if (!email.trim() || !senha) {
      setErro('Preencha e-mail e senha.')
      return
    }

    setEnviando(true)
    const { error } = await signIn(email.trim(), senha)
    setEnviando(false)

    if (error) setErro(error)
  }

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse sua conta para ver e salvar o progresso na Grade Curricular."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className={authLabelClass}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="senha" className={authLabelClass}>
            Senha
          </label>
          <input
            id="senha"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
            className={authInputClass}
          />
        </div>

        {erro && (
          <p role="alert" className="text-sm text-red-600">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Ainda não tem conta?{' '}
        <Link to="/cadastro" className="font-semibold text-brand-600">
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  )
}