import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCards'
import SetorCard from '../components/SetorCard'
import SalaryTable from '../components/SalaryTable'
import { stats, setores, salarios } from '../data/mercado'
import CtaBanner from '../components/CtaBanner'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Mercado() {
  usePageMeta(
    'Mercado de Trabalho',
    'Setores, empresas, cargos e faixas salariais para o engenheiro de produção no mercado brasileiro.',
  )
    return (
    <>
      <PageHeader
        eyebrow="OPORTUNIDADES"
        title="Mercado de Trabalho"
        subtitle="Conheça os principais setores, empresas e cargos onde o engenheiro de produção atua."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-bold text-brand-900"> Setores de Atuação</h2>
 <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {setores.map((setor) => (
    <SetorCard key={setor.title} {...setor} />
  ))}
</div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
       <h2 className="text-3xl font-bold text-brand-900">Faixa Salarial</h2>
       <div className="mt-8">
        <SalaryTable rows={salarios}/>
       </div>
       <p className="mt-4 text-xs text-slate-500"> *Valores de referência para o mercado brasileiro em 2024. Variam por região, empresa e especialidade.</p>

      </section>

      <CtaBanner 
      title="Pronto para Começar?" 
      text="Explore a grade curricular e eja como cada disciplina prepara você para o mercado de trabalho." />
    </>
  )
}
