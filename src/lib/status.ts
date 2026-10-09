import type { Status } from '../data/disciplinas'

export const statusList: Status[] = ['nao-cursada', 'em-andamento', 'concluida']

export const statusInfo: Record<
  Status,
  {
    label: string
    icon: string
    badge: string
    border: string
    active: string
    dot: string
  }
> = {
  'nao-cursada': {
    label: 'Não cursada',
    icon: '○',
    badge: 'bg-slate-100 text-slate-500',
    border: 'border-slate-200',
    active: 'border-slate-400 bg-slate-50 text-slate-700',
    dot: 'bg-slate-400',
  },
  'em-andamento': {
    label: 'Em andamento',
    icon: '◉',
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-amber-500',
    active: 'border-amber-500 bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
  },
  concluida: {
    label: 'Concluída',
    icon: '✓',
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-500',
    active: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
  },
}