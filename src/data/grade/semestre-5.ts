import type { Disciplina } from '../disciplinas'

export const semestre5: Disciplina[] = [
  { codigo: 'ESTBAS049', nome: 'Cálculo Numérico', semestre: 5, horas: 0, categoria: 'Matemática', descricao: '', preRequisitos: ['ESTEPR0040'] },
  { codigo: 'ESTEPR0054', nome: 'Sistemas de Gestão da Qualidade', semestre: 5, horas: 0, categoria: 'Formação Profissional', descricao: '', preRequisitos: ['ESTEPR0025'] },
  { codigo: 'ESTEPR0053', nome: 'Fundamentos de Mecânica dos Sólidos e dos Fluídos', semestre: 5, horas: 0, categoria: 'Engenharia Básica', descricao: '', preRequisitos: ['ESTBAS013'] },
  // CONFIRMAR: no fluxograma o código está escrito ESTEPFR0055 (provável erro de digitação)
  { codigo: 'ESTEPR0055', nome: 'Laboratório de Eletricidade Geral', semestre: 5, horas: 0, categoria: 'Física e Eletricidade', descricao: '', preRequisitos: ['ESTEPR0045'] },
  { codigo: 'ESTEPR0051', nome: 'Modelagem e Otimização de Sistemas de Produção', semestre: 5, horas: 0, categoria: 'Formação Profissional', descricao: '', preRequisitos: ['ESTBAS001'] },
  { codigo: 'ESTEPR0050', nome: 'Higiene e Segurança do Trabalho', semestre: 5, horas: 0, categoria: 'Formação Profissional', descricao: '', preRequisitos: [] },
  { codigo: 'ESTEPR005', nome: 'Contabilidade Gerencial', semestre: 5, horas: 0, categoria: 'Gestão e Negócios', descricao: '', preRequisitos: [] },
  { codigo: 'ESTEPR052', nome: 'Psicologia do Trabalho', semestre: 5, horas: 0, categoria: 'Humanidades e Meio Ambiente', descricao: '', preRequisitos: [] },
]