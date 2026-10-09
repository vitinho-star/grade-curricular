export type Status = 'nao-cursada' | 'em-andamento' | 'concluida'

export type Disciplina = {
  codigo: string
  nome: string
  semestre: number
  horas: number
  categoria: string
  descricao: string
  preRequisitos: string[] // códigos das disciplinas exigidas antes
}

export const disciplinas: Disciplina[] = [
  {
    codigo: 'ESTEPR0017',
    nome: 'Cálculo Diferencial e Integral 1',
    semestre: 1,
    horas: 60,
    categoria: 'Matemática',
    descricao:
      'Limites, derivadas e integrais de funções de uma variável real. Regras de derivação, integrais indefinidas e definidas, aplicações em engenharia.',
    preRequisitos: [],
  },
  {
    codigo: 'ESTBAS007',
    nome: 'Física 1',
    semestre: 1,
    horas: 60,
    categoria: 'Física e Eletricidade',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
  {
    codigo: 'ESTEPR0018',
    nome: 'Introdução à Engenharia de Produção',
    semestre: 1,
    horas: 30,
    categoria: 'Formação Profissional',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
  {
    codigo: 'ESTBAS004',
    nome: 'Introdução às Ciências do Ambiente',
    semestre: 1,
    horas: 30,
    categoria: 'Humanidades e Meio Ambiente',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
  {
    codigo: 'ESTBAS030',
    nome: 'Desenho Básico',
    semestre: 1,
    horas: 30,
    categoria: 'Engenharia Básica',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
  {
    // CONFIRMAR: o código aparece pouco legível no vídeo
    codigo: 'ESTEPR0011',
    nome: 'Introdução à Administração',
    semestre: 1,
    horas: 60,
    categoria: 'Gestão e Negócios',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
  {
    codigo: 'ESTEPR0019',
    nome: 'Linguagem de Programação 1',
    semestre: 1,
    horas: 60,
    categoria: 'Computação',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
  {
    codigo: 'ESTEPR0020',
    nome: 'Fundamentos para a Elaboração e Análise de Documentos Técnicos',
    semestre: 1,
    horas: 30,
    categoria: 'Humanidades e Meio Ambiente',
    descricao: 'Descrição a preencher.',
    preRequisitos: [],
  },
]