import { useEffect } from 'react'
import { disciplinas } from '../data/disciplinas'
import type { Disciplina, Status } from '../data/disciplinas'
import { statusInfo, statusList } from '../lib/status'

type DisciplinaModalProps = {
  disciplina: Disciplina
  status: Status
  onChangeStatus: (status: Status) => void
  onClose: () => void
}

export default function DisciplinaModal({
  disciplina,
  status,
  onChangeStatus,
  onClose,
}: DisciplinaModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = overflowAnterior
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const preRequisitos = disciplina.preRequisitos.map(
    (codigo) => disciplinas.find((d) => d.codigo === codigo)?.nome ?? codigo,
  )

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-900/60 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
        >
          ✕
        </button>

        <div className="p-6 pb-4">
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="rounded-md bg-brand-400/15 px-2 py-1 text-brand-700">
              {disciplina.semestre}º Semestre
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">
              {disciplina.horas}h
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">
              {disciplina.codigo}
            </span>
          </div>

          <h2
            id="modal-titulo"
            className="mt-4 pr-8 text-2xl font-bold text-brand-900"
          >
            {disciplina.nome}
          </h2>

          <span className="mt-3 inline-block rounded-md bg-brand-400/15 px-2 py-1 font-mono text-[11px] text-brand-700">
            {disciplina.categoria}
          </span>
        </div>

        <div className="space-y-5 border-t border-brand-400/15 p-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-brand-400">
              Descrição
            </p>
            <p className="mt-2 text-sm text-slate-700">{disciplina.descricao}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-brand-400">
              Pré-requisitos
            </p>
            {preRequisitos.length === 0 ? (
              <p className="mt-2 text-sm italic text-slate-500">
                Nenhum pré-requisito
              </p>
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {preRequisitos.map((nome) => (
                  <li key={nome}>{nome}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-brand-400">
              Situação da disciplina
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {statusList.map((opcao) => {
                const info = statusInfo[opcao]
                const ativo = opcao === status

                return (
                  <button
                    key={opcao}
                    type="button"
                    onClick={() => onChangeStatus(opcao)}
                    aria-pressed={ativo}
                    className={`rounded-lg border-2 px-2 py-3 text-xs font-medium transition-colors ${
                      ativo
                        ? info.active
                        : 'border-slate-200 text-slate-500 hover:border-brand-400'
                    }`}
                  >
                    <span className="block text-base">{info.icon}</span>
                    {info.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}