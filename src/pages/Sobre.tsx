import PageHeader from '../components/PageHeader'
import InfoTable from '../components/InfoTable'
import ObjetivoCard from '../components/ObjetivoCard'
import { infoCurso, objetivos, perfil, competencias, setores } from '../data/curso'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Sobre() {
  usePageMeta(
    'Sobre o Curso',
    'Grau, duração, objetivos, perfil do profissional e competências desenvolvidas no curso de Engenharia de Produção.',
  )
  return (
    <>
      <PageHeader
        eyebrow="O CURSO"
        title="Sobre o Curso"
        subtitle="Tudo o que você precisa saber sobre a formação em Engenharia de Produção."
      />

      {/* Texto + quadro de dados */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-brand-900">
            Engenharia de Produção
          </h2>
          <p className="mt-4 text-slate-600">
            A Engenharia de Produção atua no planejamento, gerenciamento e
            melhoria de sistemas produtivos, integrando pessoas, processos,
            tecnologia e recursos.
          </p>
        </div>

        <div>
          <InfoTable rows={infoCurso} />
        </div>
      </section>

      {/* Objetivos */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-brand-900 p-8">
          <h2 className="text-2xl font-bold text-white">Objetivos do Curso</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {objetivos.map((objetivo, index) => (
              <ObjetivoCard
                key={objetivo.title}
                number={index + 1}
                {...objetivo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Perfil do profissional */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900">
            Perfil do Profissional
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {perfil.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center transition-colors hover:border-brand-400"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 text-sm font-bold text-brand-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competências */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900">
            Competências Desenvolvidas
          </h2>

          <p className="mt-4 max-w-2xl text-slate-600">
            Ao longo de 10 semestres, o estudante desenvolve um conjunto robusto
            de competências técnicas e comportamentais que o tornam apto a
            enfrentar os desafios do mercado de trabalho moderno.
          </p>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20 md:grid-cols-2 md:gap-x-8">
            {competencias.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

<section className="bg-surface px-6 pb-20">
  <div className="mx-auto max-w-4xl">
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-400/20 md:p-8">
      <h2 className="text-2xl font-bold text-brand-900">Por onde atua?</h2>

    <div className="mt-4 divide-y divide-brand-400/20">
          {setores.map((setor) => (
            <div key={setor.title} className="py-4">
              <h3 className="text-sm font-semibold text-brand-900">{setor.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{setor.description}</p>
            </div>
          ))}
    </div>
     
    </div>

    <div className="mt-12 text-center">
  <Link
    to="/grade"
    className="inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
  >
    Ver Grade Curricular Completa →
  </Link>
</div>
  </div>
</section>


    </>
  )
}