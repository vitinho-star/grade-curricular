import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import NoticiaForm from '../components/NoticiaForm'
import EditoresPanel from '../components/EditoresPanel'
import { tiposInfo, type Noticia } from '../data/noticias'
import { usePapel } from '../hooks/usePapel'
import { usePageMeta } from '../hooks/usePageMeta'
import { supabase } from '../lib/supabase'
import { removerImagem } from '../lib/imagens'

const hoje = () => new Date().toLocaleDateString('sv-SE')

function formatarData(data: string): string {
  return new Date(`${data}T00:00:00`).toLocaleDateString('pt-BR')
}

function statusDe(n: Noticia) {
  if (!n.publicada) {
    return { label: 'Rascunho', cor: 'bg-slate-100 text-slate-600' }
  }
  if (n.expira_em && n.expira_em < hoje()) {
    return { label: 'Expirado', cor: 'bg-rose-100 text-rose-700' }
  }
  return { label: 'Publicado', cor: 'bg-emerald-100 text-emerald-700' }
}

export default function Admin() {
  usePageMeta(
    'Painel de Avisos',
    'Área restrita para gerenciar os avisos do curso.',
  )

  const { eAdmin } = usePapel()
  const [lista, setLista] = useState<Noticia[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [versao, setVersao] = useState(0)
  const [formAberto, setFormAberto] = useState(false)
  const [editando, setEditando] = useState<Noticia | null>(null)

  useEffect(() => {
    let cancelado = false

    supabase
      .from('noticias')
      .select('*')
      .order('criado_em', { ascending: false })
      .then(({ data, error }) => {
        if (cancelado) return

        if (error) {
          setErro('Não foi possível carregar os avisos.')
        } else {
          setErro(null)
          setLista((data ?? []) as Noticia[])
        }
        setCarregando(false)
      })

    return () => {
      cancelado = true
    }
  }, [versao])

  function abrirNovo() {
    setEditando(null)
    setFormAberto(true)
  }

  function abrirEdicao(noticia: Noticia) {
    setEditando(noticia)
    setFormAberto(true)
  }

  function fecharForm() {
    setFormAberto(false)
    setEditando(null)
  }

  function aposSalvar() {
    fecharForm()
    setVersao((v) => v + 1)
  }

  async function alternarPublicada(noticia: Noticia) {
    setErro(null)
    const { error } = await supabase
      .from('noticias')
      .update({ publicada: !noticia.publicada })
      .eq('id', noticia.id)

    if (error) setErro('Não foi possível alterar a publicação.')
    else setVersao((v) => v + 1)
  }

    async function excluir(noticia: Noticia) {
    const confirmou = window.confirm(
      `Excluir o aviso "${noticia.titulo}"? Esta ação não pode ser desfeita.`,
    )
    if (!confirmou) return

    setErro(null)
    const { error } = await supabase
      .from('noticias')
      .delete()
      .eq('id', noticia.id)

    if (error) {
      setErro('Não foi possível excluir o aviso.')
      return
    }

    await removerImagem(noticia.imagem_url)
    setVersao((v) => v + 1)
  }

  return (
    <>
      <PageHeader
        eyebrow="ÁREA RESTRITA"
        title="Painel de Avisos"
        subtitle="Crie, edite e publique os avisos que aparecem para os alunos."
      />

      <section className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        {!formAberto && (
          <button
            type="button"
            onClick={abrirNovo}
            className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
          >
            + Novo aviso
          </button>
        )}

        {formAberto && (
          <NoticiaForm
            key={editando?.id ?? 'novo'}
            inicial={editando}
            onSalvo={aposSalvar}
            onCancelar={fecharForm}
          />
        )}

        {erro && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {erro}
          </p>
        )}

        <div>
          <h2 className="text-xl font-bold text-brand-900">Todos os avisos</h2>

          {carregando && (
            <p role="status" className="mt-4 text-slate-500">
              Carregando...
            </p>
          )}

          {!carregando && lista.length === 0 && (
            <p className="mt-4 rounded-xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-brand-400/20">
              Nenhum aviso cadastrado ainda.
            </p>
          )}

          <ul className="mt-4 space-y-3">
            {lista.map((noticia) => {
              const status = statusDe(noticia)

              return (
                <li
                  key={noticia.id}
                  className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-brand-400/20"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[11px] ${status.cor}`}
                    >
                      {status.label}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[11px] ${tiposInfo[noticia.tipo].badge}`}
                    >
                      {tiposInfo[noticia.tipo].label}
                    </span>
                    {noticia.fixada && (
                      <span className="rounded-full bg-brand-900 px-3 py-1 font-mono text-[11px] text-white">
                        Fixado
                      </span>
                    )}
                    <span className="ml-auto font-mono text-xs text-slate-500">
                      {formatarData(noticia.data)}
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-brand-900">
                    {noticia.titulo}
                  </p>

                                    {noticia.imagem_url && (
                    <img
                      src={noticia.imagem_url}
                      alt=""
                      loading="lazy"
                      className="mt-3 h-20 w-auto rounded-lg object-cover ring-1 ring-brand-400/20"
                    />
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => abrirEdicao(noticia)}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-400/40 transition-colors hover:bg-brand-400/10"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => alternarPublicada(noticia)}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-slate-50"
                    >
                      {noticia.publicada ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => excluir(noticia)}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 ring-1 ring-red-200 transition-colors hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {eAdmin && <EditoresPanel />}
      </section>
    </>
  )
}