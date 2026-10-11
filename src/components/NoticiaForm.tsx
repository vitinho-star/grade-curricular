import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { supabase } from '../lib/supabase'
import { enviarImagem, removerImagem, validarImagem } from '../lib/imagens'
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
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [removerAtual, setRemoverAtual] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)

  const previewLocal = useMemo(
    () => (arquivo ? URL.createObjectURL(arquivo) : null),
    [arquivo],
  )

  useEffect(() => {
    return () => {
      if (previewLocal) URL.revokeObjectURL(previewLocal)
    }
  }, [previewLocal])

  const imagemMostrada =
    previewLocal ?? (removerAtual ? null : (inicial?.imagem_url ?? null))

  function handleArquivo(e: ChangeEvent<HTMLInputElement>) {
    const escolhido = e.target.files?.[0]
    if (!escolhido) return

    const problema = validarImagem(escolhido)
    if (problema) {
      setErro(problema)
      e.target.value = ''
      return
    }

    setErro(null)
    setArquivo(escolhido)
    setRemoverAtual(false)
  }

  function handleRemoverImagem() {
    setArquivo(null)
    setRemoverAtual(true)
  }

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

    setSalvando(true)
    let novaUrl: string | null = null

    try {
      if (arquivo) novaUrl = await enviarImagem(arquivo)

      let imagemUrl: string | null = inicial?.imagem_url ?? null
      if (arquivo) imagemUrl = novaUrl
      else if (removerAtual) imagemUrl = null

      const dados = {
        titulo: titulo.trim(),
        texto: texto.trim(),
        tipo,
        data,
        link: link.trim() || null,
        expira_em: expiraEm || null,
        fixada,
        publicada,
        imagem_url: imagemUrl,
      }

      const { error } = inicial
        ? await supabase.from('noticias').update(dados).eq('id', inicial.id)
        : await supabase.from('noticias').insert(dados)

      if (error) {
        await removerImagem(novaUrl)
        setErro('Não foi possível salvar. Confira sua permissão e tente de novo.')
        return
      }

      if (inicial?.imagem_url && inicial.imagem_url !== imagemUrl) {
        await removerImagem(inicial.imagem_url)
      }

      onSalvo()
    } catch {
      setErro('Não foi possível enviar a imagem. Tente novamente.')
    } finally {
      setSalvando(false)
    }
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

        <div>
          <label htmlFor="imagem" className={authLabelClass}>
            Imagem (opcional)
          </label>
          <input
            id="imagem"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleArquivo}
            className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-400/15 file:px-4 file:py-2 file:font-semibold file:text-brand-700 hover:file:bg-brand-400/25"
          />
          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG ou WebP, até 3 MB. Repita a data e o local no texto do
            aviso.
          </p>

          {imagemMostrada && (
            <div className="mt-3">
              <img
                src={imagemMostrada}
                alt="Prévia da imagem do aviso"
                className="max-h-56 rounded-xl object-contain ring-1 ring-brand-400/20"
              />
              <button
                type="button"
                onClick={handleRemoverImagem}
                className="mt-2 text-sm font-medium text-red-600 hover:underline"
              >
                Remover imagem
              </button>
            </div>
          )}
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