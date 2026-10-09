import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../hooks/useAuth'
import { authInputClass, authLabelClass } from '../lib/formStyles'
import { usePageMeta } from '../hooks/usePageMeta'


export default function Cadastro() {
  usePageMeta(
    'Criar conta',
    'Crie sua conta para salvar seu progresso na grade curricular.',
  )
  const { user, loading, signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  if (!loading && user) {
    return <Navigate to="/grade" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    setAviso(null)

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErro('Informe um e-mail válido.')
      return
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (senha !== confirmar) {
      setErro('As senhas não conferem.')
      return
    }

    setEnviando(true)
    const { error, precisaConfirmar } = await signUp(email.trim(), senha)
    setEnviando(false)

    if (error) {
      setErro(error)
      return
    }

    if (precisaConfirmar) {
      setAviso(
        `Conta criada! Enviamos um e-mail de confirmação para ${email.trim()}. Clique no link e depois entre.`,
      )
      setSenha('')
      setConfirmar('')
    }
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Com uma conta, seu progresso fica salvo e acompanha você em qualquer aparelho."
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
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Mínimo de 6 caracteres"
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="confirmar" className={authLabelClass}>
            Confirmar senha
          </label>
          <input
            id="confirmar"
            type="password"
            autoComplete="new-password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            placeholder="Repita a senha"
            className={authInputClass}
          />
        </div>

        {erro && (
          <p role="alert" className="text-sm text-red-600">
            {erro}
          </p>
        )}

        {aviso && (
          <p
            role="status"
            className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {aviso}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {enviando ? 'Criando...' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Já tem conta?{' '}
        <Link to="/login" className="font-semibold text-brand-600">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  )
}