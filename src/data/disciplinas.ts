import { semestre1 } from './grade/semestre-1'
import { semestre2 } from './grade/semestre-2'
import { semestre3 } from './grade/semestre-3'
import { semestre4 } from './grade/semestre-4'
import { semestre5 } from './grade/semestre-5'
import { semestre6 } from './grade/semestre-6'
import { semestre7 } from './grade/semestre-7'
import { semestre8 } from './grade/semestre-8'
import { semestre9 } from './grade/semestre-9'
import { semestre10 } from './grade/semestre-10'
import { validarGrade } from '../lib/validarGrade'

export type Status = 'nao-cursada' | 'em-andamento' | 'concluida'

export type Disciplina = {
  codigo: string
  nome: string
  semestre: number
  horas: number // 0 = ainda não informada
  categoria: string
  descricao: string // '' = ainda não informada
  preRequisitos: string[] // códigos das disciplinas exigidas antes
  preRequisitoAtePeriodo?: number // "todas as disciplinas do 1º ao Nº período"
}

export const disciplinas: Disciplina[] = [
  ...semestre1,
  ...semestre2,
  ...semestre3,
  ...semestre4,
  ...semestre5,
  ...semestre6,
  ...semestre7,
  ...semestre8,
  ...semestre9,
  ...semestre10,
]

if (import.meta.env.DEV) {
  const problemas = validarGrade(disciplinas)
  if (problemas.length > 0) {
    console.warn(
      `Grade com ${problemas.length} pendência(s):\n` + problemas.join('\n'),
    )
  }
}