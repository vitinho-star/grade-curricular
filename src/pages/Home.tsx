import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import CampoCard from '../components/CampoCard'
import { campos, destaquesGrade } from '../data/home'
import { usePageMeta } from '../hooks/usePageMeta'

const features = [
  {
    icon: '🎯',
    title: 'Foco em resultados',
    description: 'Melhoria contínua e geração de valor em toda a cadeia.',
  },
  {
    icon: '🤝',
    title: 'Visão sistêmica',
    description: 'Integração entre pessoas, processos e tecnologia.',
  },
  {
    icon: '📈',
    title: 'Análise quantitativa',
    description: 'Decisões embasadas em dados e modelos matemáticos.',
  },
  {
    icon: '🌐',
    title: 'Atuação ampla',
    description: 'Presente em indústria, serviços, saúde, agronegócio e mais.',
  },
]

export default function Home() {
  usePageMeta(
    'Engenharia de Produção',
    'Conheça o curso de Engenharia de Produção: o que é, áreas de atuação e como acompanhar sua grade curricular.',
  )
  return (
    <>
      {/* Introdução */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-widest text-brand-600">
            O CURSO
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-brand-900 md:text-5xl">
            O que é Engenharia de Produção?
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            A Engenharia de Produção é responsável por planejar, projetar e
            gerenciar sistemas que envolvem pessoas, equipamentos, materiais e
            informações. Sua missão central é aumentar a eficiência e a
            qualidade dos processos produtivos e de serviços.
          </p>

          <p className="mt-4 text-lg text-slate-600">
            Diferente de outras engenharias, o foco não está apenas na parte
            técnica, mas na integração entre tecnologia, gestão e processos,
            formando um profissional versátil capaz de atuar em qualquer setor
            da economia.
          </p>

          <Link
            to="/sobre"
            className="mt-8 inline-block font-semibold text-brand-600"
          >
            Saiba mais sobre o curso →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Campos de atuação */}
      <section className="bg-brand-900 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-mono text-xs tracking-widest text-brand-400">
              ÁREAS
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              Campos de Atuação
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-violet-200">
              O engenheiro de produção transita por múltiplos domínios,
              adaptando-se às demandas de cada setor.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campos.map((campo) => (
              <CampoCard key={campo.title} {...campo} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/areas"
              className="inline-block rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Ver todas as áreas
            </Link>
          </div>
        </div>
      </section>

      {/* Chamada para a grade */}
      <section className="px-6 py-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-brand-400/20 md:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-400/15"
          />

          <div className="relative">
            <p className="font-mono text-xs tracking-widest text-brand-600">
              FUNCIONALIDADE PRINCIPAL
            </p>

            <h2 className="mt-3 max-w-md text-4xl font-extrabold leading-tight text-brand-900 md:text-5xl">
              Acompanhe sua Grade Curricular
            </h2>

            <p className="mt-6 max-w-xl text-slate-600">
              Visualize todas as disciplinas organizadas por semestre, acesse
              detalhes de cada matéria, marque o seu progresso e acompanhe sua
              jornada até a formatura com uma barra de progresso em tempo real.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {destaquesGrade.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-slate-600"
                >
                  • {item}
                </li>
              ))}
            </ul>

            <Link
              to="/grade"
              className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-700"
            >
              Acessar Grade Curricular →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}