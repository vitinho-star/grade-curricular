import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { authInputClass, authLabelClass } from '../lib/formStyles'

type Editor = {
  user_id: string
  email: string
  papel: 'editor' | 'admin'
  criado_em: string
}

export default function EditoresPanel() {
  const [editores, setEditores] = useState<Editor[]>([])
  const [versao, setVersao] = useState(0)
  const [email, setEmail] = useState('')
  const [papel, setPapel] = useState<'editor' | 'admin'>('editor')
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    let cancelado = false

    supabase.rpc('listar_editores').then(({ data, error }) => {
      if (cancelado) return
      if (error) setErro('Não foi possível carregar os editores.')
      else setEditores((data ?? []) as Editor[])
    })

    return () => {
      cancelado = true
    }
  }, [versao])

  async function handleAdicionar(e: FormEvent) {
    e.preventDefault()
    setErro(null)

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErro('Informe um e-mail válido.')
      return
    }

    setEnviando(true)
    const { error } = await supabase.rpc('adicionar_editor', {
      p_email: email.trim(),
      p_papel: papel,
    })
    setEnviando(false)

    if (error) {
      setErro(error.message)
      return
    }

    setEmail('')
    setVersao((v) => v + 1)
  }

  async function handleRemover(editor: Editor) {
    if (!window.confirm(`Remover a permissão de ${editor.email}?`)) return

    setErro(null)
    const { error } = await supabase.rpc('remover_editor', {
      p_user_id: editor.user_id,
    })

    if (error) {
      setErro(error.message)
      return
    }

    setVersao((v) => v + 1)
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20">
      <h2 className="text-xl font-bold text-brand-900">Editores</h2>
      <p className="mt-1 text-sm text-slate-600">
        Quem pode criar e editar avisos. Administradores também gerenciam esta
        lista. A pessoa precisa ter criado uma conta no site antes.
      </p>

      <ul className="mt-4 divide-y divide-brand-400/20">
        {editores.map((editor) => (
          <li
            key={editor.user_id}
            className="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-brand-900">
                {editor.email}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600">
                {editor.papel === 'admin' ? 'Administrador' : 'Editor'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleRemover(editor)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 ring-1 ring-red-200 transition-colors hover:bg-red-50"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleAdicionar}
        noValidate
        className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end"
      >
        <div>
          <label htmlFor="novo-editor" className={authLabelClass}>
            E-mail da pessoa
          </label>
          <input
            id="novo-editor"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="pessoa@email.com"
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="novo-papel" className={authLabelClass}>
            Papel
          </label>
          <select
            id="novo-papel"
            value={papel}
            onChange={(e) => setPapel(e.target.value as 'editor' | 'admin')}
            className={authInputClass}
          >
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {enviando ? 'Adicionando...' : 'Adicionar'}
        </button>
      </form>

      {erro && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {erro}
        </p>
      )}
    </div>
  )
}