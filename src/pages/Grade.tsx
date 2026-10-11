import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import StatsBar from '../components/StatsBar'
import DisciplinaCard from '../components/DisciplinaCard'
import DisciplinaModal from '../components/DisciplinaModal'
import { disciplinas } from '../data/disciplinas'
import type { Disciplina, Status } from '../data/disciplinas'
import { useProgresso } from '../hooks/useProgresso'
import StatusLegend from '../components/StatusLegend'
import { usePageMeta } from '../hooks/usePageMeta'

type Filtro = 'todas' | Status

const filtros: { value: Filtro; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'concluida', label: 'Concluídas' },
  { value: 'em-andamento', label: 'Em andamento' },
  { value: 'nao-cursada', label: 'Não cursadas' },
]

const semestres = Array.from({ length: 10 }, (_, i) => i + 1)

export default function Grade() {
  usePageMeta(
    'Grade Curricular',
    'Acompanhe seu progresso nas disciplinas de cada semestre do curso de Engenharia de Produção.',
  )
  const { getStatus, setStatus, carregando, erro } = useProgresso()
  const [semestre, setSemestre] = useState(1)
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [selecionada, setSelecionada] = useState<Disciplina | null>(null)

  if (carregando) {
  return (
    <p role="status" className="px-6 py-24 text-center text-slate-500">
      Carregando seu progresso...
    </p>
  )
}
  const total = disciplinas.length
  const concluidas = disciplinas.filter(
    (d) => getStatus(d.codigo) === 'concluida',
  ).length
  const emAndamento = disciplinas.filter(
    (d) => getStatus(d.codigo) === 'em-andamento',
  ).length

  const doSemestre = disciplinas.filter((d) => d.semestre === semestre)
  const horasSemestre = doSemestre.reduce((soma, d) => soma + d.horas, 0)
  const horasCompletas =
  doSemestre.length > 0 && doSemestre.every((d) => d.horas > 0)
  const visiveis = doSemestre.filter(
    (d) => filtro === 'todas' || getStatus(d.codigo) === filtro,
  )

  return (
    <>
      <PageHeader
        eyebrow="GRADE CURRICULAR"
        title="Acompanhe sua Jornada"
        subtitle="Clique em uma disciplina para ver detalhes e atualizar sua situação."
      />

      <section className="mx-auto max-w-6xl px-6 py-10">
       {erro && (
  <p
    role="alert"
    className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
  >
    {erro}
  </p>
)}
       
        <StatsBar
          total={total}
          concluidas={concluidas}
          emAndamento={emAndamento}
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-widest text-brand-400">
          Semestre
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {semestres.map((numero) => {
  const doNumero = disciplinas.filter((d) => d.semestre === numero)
  const feitas = doNumero.filter(
    (d) => getStatus(d.codigo) === 'concluida',
  ).length
  const ativo = numero === semestre
  const completo = doNumero.length > 0 && feitas === doNumero.length

  return (
    <button
      key={numero}
      type="button"
      onClick={() => setSemestre(numero)}
      aria-pressed={ativo}
      className={`relative rounded-xl px-4 py-2 text-center transition-colors ${
        ativo
          ? 'bg-brand-600 text-white shadow-md'
          : 'bg-white text-brand-900 ring-1 ring-brand-400/20 hover:ring-brand-600'
      }`}
    >
      <span className="block text-sm font-bold">{numero}º</span>
      <span className="block font-mono text-[10px] opacity-70">
        {feitas}/{doNumero.length}
      </span>
      {completo && (
        <span
          role="img"
          aria-label="Semestre completo"
          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white"
        >
          ✓
        </span>
      )}
    </button>
  )
})}
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">
              {semestre}º Semestre
            </h2>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {doSemestre.length} disciplinas
              {horasCompletas && ` · ${horasSemestre}h`}           
             </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFiltro(f.value)}
                aria-pressed={filtro === f.value}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filtro === f.value
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-slate-600 ring-1 ring-brand-400/20 hover:ring-brand-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

          {visiveis.length === 0 ? (
          <p className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-brand-400/20">
            Nenhuma disciplina para mostrar aqui.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visiveis.map((disciplina) => (
              <DisciplinaCard
                key={disciplina.codigo}
                disciplina={disciplina}
                status={getStatus(disciplina.codigo)}
                onClick={() => setSelecionada(disciplina)}
              />
            ))}
          </div>
        )}

        <StatusLegend />
      </section>

      {selecionada && (
        <DisciplinaModal
          disciplina={selecionada}
          status={getStatus(selecionada.codigo)}
          onChangeStatus={(status) => setStatus(selecionada.codigo, status)}
          onClose={() => setSelecionada(null)}
        />
      )}
    </>
  )
}