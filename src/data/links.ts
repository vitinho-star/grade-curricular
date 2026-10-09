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
    url: '#',
  },
  {
    initials: 'EN',
    tag: 'Evento',
    name: 'ENEGEP',
    fullName: 'Encontro Nacional de Engenharia de Produção',
    description:
      'Maior evento nacional da área, reunindo estudantes, pesquisadores e profissionais para compartilhar pesquisas, experiências e tendências.',
    url: '#',
  },
  {
    initials: 'CF',
    tag: 'Conselho profissional',
    name: 'CONFEA',
    fullName: 'Conselho Federal de Engenharia e Agronomia',
    description:
      'Instância federal que regulamenta e fiscaliza o exercício das profissões de engenharia, agronomia e geociências no Brasil.',
    url: '#',
  },
  {
    initials: 'CA',
    tag: 'Conselho profissional',
    name: 'CREA-AM',
    fullName: 'Conselho Regional de Engenharia e Agronomia do Amazonas',
    description:
      'Órgão regional responsável pelo registro, orientação e fiscalização do exercício profissional da engenharia no Amazonas.',
    url: '#',
  },
  {
    initials: 'PR',
    tag: 'Pesquisa',
    name: 'Revista Produção',
    fullName: 'Production, periódico científico da ABEPRO',
    description:
      'Periódico científico de acesso aberto com pesquisas sobre operações, logística, qualidade, sustentabilidade e sistemas produtivos.',
    url: '#',
  },
  {
    initials: 'PC',
    tag: 'Plataforma acadêmica',
    name: 'Portal de Periódicos CAPES',
    fullName: 'Biblioteca científica digital',
    description:
      'Uma das maiores bibliotecas virtuais de conteúdo científico do país, com artigos, bases de dados, livros e periódicos acadêmicos.',
    url: '#',
  },
  {
    initials: 'II',
    tag: 'Internacional',
    name: 'IISE',
    fullName: 'Institute of Industrial and Systems Engineers',
    description:
      'Organização internacional dedicada ao avanço da engenharia industrial e de sistemas por meio de formação, eventos e publicações.',
    url: '#',
  },
  {
    initials: 'PO',
    tag: 'Internacional',
    name: 'POMS',
    fullName: 'Production and Operations Management Society',
    description:
      'Sociedade internacional que conecta pesquisadores e profissionais interessados em gestão da produção e de operações.',
    url: '#',
  },
]