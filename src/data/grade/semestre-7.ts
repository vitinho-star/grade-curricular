import type { Disciplina } from '../disciplinas'

export const semestre7: Disciplina[] = [
  { codigo: 'ESTEPR011', nome: 'Custos Industriais e Orçamento', semestre: 7, horas: 0, categoria: 'Gestão e Negócios', descricao: '', preRequisitos: ['ESTEPR014'] },
  { codigo: 'ESTEPR0070', nome: 'Gestão de Projetos', semestre: 7, horas: 0, categoria: 'Gestão e Negócios', descricao: '', preRequisitos: ['ESTEPR0064'] },
  { codigo: 'ESTEPR0072', nome: 'Modelagem Probabilística e Simulação de Sistemas', semestre: 7, horas: 0, categoria: 'Formação Profissional', descricao: '', preRequisitos: ['ESTEPR0022'] },
  { codigo: 'ESTEPR0071', nome: 'Sistemas de Gestão Ambiental', semestre: 7, horas: 0, categoria: 'Humanidades e Meio Ambiente', descricao: '', preRequisitos: ['ESTBAS004'] },
  { codigo: 'ESTEPR028', nome: 'Logística e Cadeia de Suprimentos', semestre: 7, horas: 0, categoria: 'Formação Profissional', descricao: '', preRequisitos: ['ESTEPR0066'] },
  // CONFIRMAR: no fluxograma esta disciplina não tem código (aparece "*******")
  { codigo: 'TOPICOS-EP1', nome: 'Tópicos Especiais em Engenharia de Produção 1', semestre: 7, horas: 0, categoria: 'Formação Profissional', descricao: '', preRequisitos: [], preRequisitoAtePeriodo: 6 },
]