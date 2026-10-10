export type Recurso = {
  initials: string
  tag: string
  name: string
  fullName: string
  description: string
  url: string
}

export const recursos: Recurso[] = [
  {
    initials: 'AB',
    tag: 'Associação',
    name: 'ABEPRO',
    fullName: 'Associação Brasileira de Engenharia de Produção',
    description:
      'Principal entidade representativa da área no Brasil, responsável por fomentar o ensino, a pesquisa e a atuação profissional em Engenharia de Produção.',
    url: 'https://portal.abepro.org.br/abepro2025/',
  },
  {
    initials: 'EN',
    tag: 'Evento',
    name: 'ENEGEP',
    fullName: 'Encontro Nacional de Engenharia de Produção',
    description:
      'Maior evento nacional da área, reunindo estudantes, pesquisadores e profissionais para compartilhar pesquisas, experiências e tendências.',
    url: 'https://portal.abepro.org.br/enegep/2026/',
  },

  {
    initials: 'CA',
    tag: 'Conselho profissional',
    name: 'CREA-AM',
    fullName: 'Conselho Regional de Engenharia e Agronomia do Amazonas',
    description:
      'Órgão regional responsável pelo registro, orientação e fiscalização do exercício profissional da engenharia no Amazonas.',
    url: ' https://crea-am.org.br/creaam_site/?site=yes',
  },
  {
    initials: 'PR',
    tag: 'Pesquisa',
    name: 'Revista Produção',
    fullName: 'Production, periódico científico da ABEPRO',
    description:
      'Periódico científico de acesso aberto com pesquisas sobre operações, logística, qualidade, sustentabilidade e sistemas produtivos.',
    url: 'https://www.scielo.br/j/prod/',
  },
]