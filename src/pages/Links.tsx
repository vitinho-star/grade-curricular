import PageHeader from '../components/PageHeader'
import RecursoCard from '../components/RecursoCard'
import CtaBanner from '../components/CtaBanner'
import { recursos } from '../data/links'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Links() {
  usePageMeta(
    'Links e Referências',
    'Instituições, eventos e plataformas essenciais para ampliar sua formação em Engenharia de Produção.',
  )
  return (
    <>
      <PageHeader
        eyebrow="PORTAL DE REFERÊNCIAS"
        title="Engenharia de Produção: Links e Referências"
        subtitle="Uma seleção de instituições, eventos e plataformas essenciais para ampliar sua formação e acompanhar as novidades da área."
      />

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-widest text-brand-600">ECPLORE E CONECTE-SE</p>
          <h2 className="mt-2 max-w-xl text-3xl font-bold text-brand-900"> 	Recursos para sua jornada acadêmica e profissional </h2>
        </div>
         <p className="max-w-xs text-sm text-slate-500">Os links abaixo levam aos canais oficiais de cada organização e abrem em uma nova guia.</p>
        </div>
        <section className="mx-auto max-w-6xl px-6 py-10">
  <div className="grid gap-6 md:grid-cols-2">
    {recursos.map((recurso) => (
      <RecursoCard key={recurso.name} {...recurso} />
    ))}
  </div>
</section>
      </section>
<CtaBanner
  title="Conhecimento que vai além da sala de aula"
  text="Acompanhe eventos, consulte publicações científicas e participe das organizações da área para construir uma rede profissional desde o início da graduação."
/>
    </>
  )
}