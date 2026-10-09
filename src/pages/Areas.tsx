import PageHeader from '../components/PageHeader'
import AreaCard from '../components/AreaCard'
import CtaBanner from '../components/CtaBanner'
import { areas } from '../data/areas'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Areas() {
  usePageMeta(
    'Áreas de Atuação',
    'Conheça os principais campos de atuação do engenheiro de produção: produção, logística, qualidade, projetos e mais.',
  )
  return (
    <>
      <PageHeader
        eyebrow="ONDE ATUAR"
        title="Áreas de Atuação"
        subtitle="O engenheiro de produção é um dos profissionais mais versáteis da engenharia. Conheça os principais campos de atuação."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {areas.map((area) => (
            <AreaCard key={area.title} {...area} />
          ))}
        </div>
      </section>

      <CtaBanner
        title="A versatilidade é a maior vantagem"
        text={
          <>
            Enquanto outras engenharias são especializadas em produtos ou
            tecnologias específicas, o engenheiro de produção é formado para
            atuar em{' '}
            <strong className="text-white">qualquer setor da economia</strong>{' '}
            — desde a indústria automobilística até hospitais, do agronegócio às
            fintechs.
          </>
        }
      />
    </>
  )
}