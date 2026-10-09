export type Stat = {
  value: string
  label: string
  note: string
}

export const stats: Stat[] = [
  {
    value: '#3',
    label: 'Curso mais procurado',
    note: 'em Engenharia no Brasil',
  },
  {
    value: '95%',
    label: 'Taxa de empregabilidade',
    note: 'em até 6 meses após formatura',
  },
  {
    value: '30+',
    label: 'Setores de atuação',
    note: 'da indústria à tecnologia',
  },
  {
    value: 'R$ 8k+',
    label: 'Salário médio',
    note: 'dos formados com 3+ anos',
  },
]

export type Setor = {
  icon: string
  title: string
  description: string
  companies: string[]
  roles: string[]
}

export const setores: Setor[] = [
  {
    icon: '🏭',
    title: 'Indústria Manufatureira',
    description:
      'O setor mais tradicional para o EP, abrangendo todos os tipos de manufatura: automotiva, alimentícia, farmacêutica, química, têxtil e eletroeletrônica.',
    companies: ['Embraer', 'Volkswagen', 'Nestlé', 'Johnson & Johnson', 'Ambev', '3M'],
    roles: ['Gerente de Produção', 'Analista de PCP', 'Engenheiro de Processos', 'Coord. de Qualidade'],
  },
  {
    icon: '📦',
    title: 'Logística e Distribuição',
    description:
      'Operadores logísticos, transportadoras e centros de distribuição precisam de profissionais capazes de otimizar fluxos e reduzir custos.',
    companies: ['DHL', 'Localfrio', 'JSL Logística', 'Magazine Luiza', 'Mercado Livre', 'Amazon'],
    roles: ['Analista de Logística', 'Coord. de Armazém', 'Gerente de Supply Chain', 'Analista WMS'],
  },
  {
    icon: '📊',
    title: 'Consultoria e Gestão',
    description:
      'Empresas de consultoria contratam EPs para projetos de melhoria operacional, reestruturação de processos e transformação digital.',
    companies: ['McKinsey', 'BCG', 'Deloitte', 'Accenture', 'TOTVS', 'PwC'],
    roles: ['Consultor Operacional', 'Analista de Processos', 'Gerente de Projetos', 'Business Analyst'],
  },
  {
    icon: '🏥',
    title: 'Saúde e Hospitais',
    description:
      'Gestão hospitalar, supply chain de medicamentos, otimização de fluxos de atendimento e gestão de qualidade em saúde.',
    companies: ['Hospital Sírio-Libanês', 'Fleury', 'Dasa', "Rede D'Or", 'Unimed', 'EMS'],
    roles: ['Analista Hospitalar', 'Gestão de Suprimentos', 'Coord. de Qualidade', 'Engenheiro Clínico'],
  },
  {
    icon: '🚀',
    title: 'Tecnologia e Startups',
    description:
      'Industry 4.0, fintechs, e-commerce e startups de tecnologia demandam EPs para escalar operações e implementar processos eficientes.',
    companies: ['iFood', 'Nubank', 'Rappi', 'Totvs', 'Vtex', 'Loft'],
    roles: ['Operations Manager', 'Product Owner', 'Analista de Dados', 'Head of Operations'],
  },
  {
    icon: '🌱',
    title: 'Agronegócio',
    description:
      'Um dos setores que mais cresce no Brasil, demandando gestão de cadeias agroindustriais, cooperativas e operações rurais.',
    companies: ['Cargill', 'JBS', 'BRF', 'Raízen', 'Cocamar', 'Conab'],
    roles: ['Analista de Supply Chain', 'Gerente de Operações', 'Coord. de Qualidade', 'Consultor Agro'],
  },
]

export type FaixaSalarial = {
  level: string
  range: string
  profile: string
}

export const salarios: FaixaSalarial[] = [
  { level: 'Trainee / Júnior', range: 'R$ 3.500 – R$ 6.000', profile: '0–2 anos de experiência' },
  { level: 'Pleno', range: 'R$ 6.000 – R$ 11.000', profile: '2–5 anos de experiência' },
  { level: 'Sênior', range: 'R$ 11.000 – R$ 18.000', profile: '5–10 anos de experiência' },
  { level: 'Coordenador / Gerente', range: 'R$ 15.000 – R$ 30.000+', profile: '8+ anos, liderança de equipes' },
]