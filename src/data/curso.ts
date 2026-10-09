export type InfoRow = {
  label: string
  value: string
}

export const infoCurso: InfoRow[] = [
  { label: 'Grau', value: 'Bacharel em Engenharia de Produção' },
  { label: 'Duração', value: '10 semestres (5 anos)' },
  { label: 'Carga Horária', value: '3.500+ horas' },
  { label: 'Total de Disciplinas', value: '63 disciplinas' },
  { label: 'Modalidade', value: 'Presencial' },
]

export type Objetivo = {
  title: string
  description: string
}

export const objetivos: Objetivo[] = [
  {
    title: 'Formação sólida',
    description:
      'Proporcionar base matemática, científica e tecnológica para análise e solução de problemas complexos.',
  },
  {
    title: 'Visão sistêmica',
    description:
      'Desenvolver a capacidade de enxergar o todo, integrando variáveis técnicas, humanas e econômicas.',
  },
  {
    title: 'Gestão eficiente',
    description:
      'Capacitar para planejar e controlar sistemas produtivos com foco em qualidade, custo e prazo.',
  },
  {
    title: 'Inovação',
    description:
      'Estimular o pensamento criativo e empreendedor para propor soluções inovadoras e sustentáveis.',
  },
  {
    title: 'Responsabilidade',
    description:
      'Formar profissionais éticos, comprometidos com a sociedade e com o desenvolvimento sustentável.',
  },
  {
    title: 'Liderança',
    description:
      'Preparar para conduzir equipes, projetos e processos de transformação organizacional.',
  },
]

export type Perfil = {
  icon: string
  title: string
  description: string
}

export const perfil: Perfil[] = [
  {
    icon: '🔎',
    title: 'Analítico',
    description:
      'Capacidade de decompor problemas complexos e propor soluções baseadas em dados.',
  },
  {
    icon: '🔗',
    title: 'Integrador',
    description:
      'Conecta diferentes áreas (técnica, gestão, pessoas e tecnologia) de forma coesa.',
  },
  {
    icon: '📐',
    title: 'Metodológico',
    description:
      'Aplica métodos estruturados e ferramentas para garantir rigor nas decisões.',
  },
  {
    icon: '🚀',
    title: 'Empreendedor',
    description:
      'Identifica oportunidades de melhoria e age proativamente para gerar valor.',
  },
]

export const competencias: string[] = [
  'Modelagem e otimização de sistemas de produção',
  'Gestão da qualidade total e melhoria contínua',
  'Planejamento e controle de operações (PCP/MRP)',
  'Análise de custos e engenharia econômica',
  'Gestão de projetos (PMBOK, Agile)',
  'Logística e gestão da cadeia de suprimentos',
  'Análise quantitativa e pesquisa operacional',
  'Liderança, gestão de equipes e comunicação',
  'Uso de ferramentas Lean e Six Sigma',
  'Pensamento sistêmico e visão estratégica',
]

export type Setor = {
  title: string
  description: string
}

export const setores: Setor[] = [
  {
    title: 'Indústria Manufatureira',
    description: 'Automobilística, alimentícia, têxtil, química...',
  },
  {
    title: 'Saúde e Hospitais',
    description: 'Gestão de operações hospitalares e supply chain.',
  },
  {
    title: 'Logística e Transporte',
    description: 'Centros de distribuição, operadores logísticos.',
  },
  {
    title: 'Tecnologia e Serviços',
    description: 'Consultorias, startups, fintechs, e-commerce.',
  },
  {
    title: 'Agronegócio',
    description: 'Gestão de cadeias agroindustriais e cooperativas.',
  },
  {
    title: 'Setor Público',
    description: 'Gestão de serviços e projetos governamentais.',
  },
]