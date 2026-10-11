import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { tiposInfo, type Noticia, type TipoNoticia } from '../data/noticias'
import { authInputClass, authLabelClass } from '../lib/formStyles'

type NoticiaFormProps = {
  inicial: Noticia | null
  onSalvo: () => void
  onCancelar: () => void
}

const tipos = Object.keys(tiposInfo) as TipoNoticia[]
const hoje = () => new Date().toLocaleDateString('sv-SE')

export default function NoticiaForm({
  inicial,
  onSalvo,
  onCancelar,
}: NoticiaFormProps) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '')
  const [texto, setTexto] = useState(inicial?.texto ?? '')
  const [tipo, setTipo] = useState<TipoNoticia>(inicial?.tipo ?? 'aviso')
  const [data, setData] = useState(inicial?.data ?? hoje())
  const [link, setLink] = useState(inicial?.link ?? '')
  const [expiraEm, setExpiraEm] = useState(inicial?.expira_em ?? '')
  const [fixada, setFixada] = useState(inicial?.fixada ?? false)
  const [publicada, setPublicada] = useState(inicial?.publicada ?? false)
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)

    if (titulo.trim().length < 3) {
      setErro('Escreva um título com pelo menos 3 caracteres.')
      return
    }
    if (texto.trim().length < 10) {
      setErro('Escreva um texto com pelo menos 10 caracteres.')
      return
    }
    if (link.trim() && !/^https?:\/\//i.test(link.trim())) {
      setErro('O link precisa começar com http:// ou https://')
      return
    }
    if (expiraEm && expiraEm < data) {
      setErro('A data de expiração não pode ser anterior à data do aviso.')
      return
    }

    const dados = {
      titulo: titulo.trim(),
      texto: texto.trim(),
      tipo,
      data,
      link: link.trim() || null,
      expira_em: expiraEm || null,
      fixada,
      publicada,
    }

    setSalvando(true)

    const { error } = inicial
      ? await supabase.from('noticias').update(dados).eq('id', inicial.id)
      : await supabase.from('noticias').insert(dados)

    setSalvando(false)

    if (error) {
      setErro('Não foi possível salvar. Confira sua permissão e tente de novo.')
      return
    }

    onSalvo()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20"
    >
      <h2 className="text-xl font-bold text-brand-900">
        {inicial ? 'Editar aviso' : 'Novo aviso'}
      </h2>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="titulo" className={authLabelClass}>
            Título
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="texto" className={authLabelClass}>
            Texto
          </label>
          <textarea
            id="texto"
            rows={5}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className={authInputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="tipo" className={authLabelClass}>
              Tipo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoNoticia)}
              className={authInputClass}
            >
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {tiposInfo[t].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="data" className={authLabelClass}>
              Data
            </label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="expira" className={authLabelClass}>
              Expira em (opcional)
            </label>
            <input
              id="expira"
              type="date"
              value={expiraEm}
              onChange={(e) => setExpiraEm(e.target.value)}
              className={authInputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="link" className={authLabelClass}>
            Link (opcional)
          </label>
          <input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className={authInputClass}
          />
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-slate-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={publicada}
              onChange={(e) => setPublicada(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            Publicar agora (desmarcado fica como rascunho)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={fixada}
              onChange={(e) => setFixada(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            Fixar no topo
          </label>
        </div>
      </div>

      {erro && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {erro}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={salvando}
          className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-lg px-5 py-2.5 font-semibold text-slate-600 ring-1 ring-slate-300 transition-colors hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}