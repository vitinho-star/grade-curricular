import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre o Curso' },
  { to: '/grade', label: 'Grade Curricular' },
  { to: '/areas', label: 'Áreas de Atuação' },
  { to: '/mercado', label: 'Mercado de Trabalho' },
  { to: '/links', label: 'Links e Referências' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSair() {
    await signOut()
    setAberto(false)
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between bg-brand-900 px-6 py-3">
      <NavLink to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
          EP
        </div>
        <div className="font-mono text-xs leading-tight text-white">
          Engenharia de{' '}
          <span className="block text-brand-400">Produção</span>
        </div>
      </NavLink>

      <div className="hidden items-center gap-2 xl:flex">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white'
                : 'rounded-lg px-3 py-1.5 text-sm text-white/70 hover:text-white'
            }
          >
            {link.label}
          </NavLink>
        ))}

        {user ? (
          <button
            type="button"
            onClick={handleSair}
            className="ml-2 rounded-lg border border-white/30 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
          >
            Sair
          </button>
        ) : (
          <Link
            to="/login"
            className="ml-2 rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Entrar
          </Link>
        )}
      </div>

      <button
        type="button"
        aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setAberto(!aberto)}
        className="rounded-lg px-3 py-1.5 text-2xl text-white xl:hidden"
      >
        {aberto ? '✕' : '☰'}
      </button>

      {aberto && (
        <div className="flex w-full flex-col gap-1 pt-3 xl:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setAberto(false)}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-lg bg-brand-600 px-3 py-2 text-sm text-white'
                  : 'rounded-lg px-3 py-2 text-sm text-white/70'
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <button
              type="button"
              onClick={handleSair}
              className="mt-2 rounded-lg border border-white/30 px-3 py-2 text-left text-sm text-white"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setAberto(false)}
              className="mt-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}