import PageHeader from '../components/PageHeader'
import ContatoItemRow from '../components/ContatoItemRow'
import { contatos, coordenacao } from '../data/contato'
import ContatoForm from '../components/ContatoForm'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Contato() {
  usePageMeta(
    'Contato',
    'Fale com a coordenação do curso de Engenharia de Produção: endereço, telefone, e-mail e formulário.',
  )
  return (
    <>
      <PageHeader
        eyebrow="FALE CONOSCO"
        title="Contato"
        subtitle="Dúvidas sobre o curso, processo seletivo ou grade curricular? Entre em contato com a coordenação."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        {/* Coluna da esquerda */}
        <div>
          <h2 className="text-2xl font-bold text-brand-900">
            Informações de Contato
          </h2>

          <div className="mt-6 space-y-5">
            {contatos.map((contato) => (
              <ContatoItemRow key={contato.label} {...contato} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20">
            <h3 className="text-lg font-bold text-brand-900">
              Coordenação do Curso
            </h3>

            <p className="mt-4 font-mono text-[11px] tracking-widest text-brand-400">
              COORDENADOR
            </p>
            <p className="font-semibold text-brand-900">
              {coordenacao.coordenador}
            </p>

            <p className="mt-3 font-mono text-[11px] tracking-widest text-brand-400">
              SECRETARIA
            </p>
            <p className="font-semibold text-brand-900">
              {coordenacao.secretaria}
            </p>
          </div>
        </div>

       <ContatoForm />
      </section>
    </>
  )
}