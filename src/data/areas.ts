export type Area = {
  icon: string
  title: string
  description: string
  tools: string[]
}

export const areas: Area[] = [
  {
    icon: '⚙️',
    title: 'Produção',
    description:
      'Planeja, programa e controla as atividades de manufatura para garantir eficiência, qualidade e entrega no prazo. Usa sistemas MRP, ERP e metodologias como Lean e Six Sigma.',
    tools: ['MRP/MRP II', 'Lean Manufacturing', 'Six Sigma', 'OEE', 'Kanban'],
  },
  {
    icon: '🚚',
    title: 'Logística',
    description:
      'Gerencia o fluxo de materiais, produtos e informações da origem ao cliente final, otimizando transporte, armazenagem e distribuição.',
    tools: ['WMS', 'TMS', 'Roteirização', 'Gestão de Estoques', 'Last-mile'],
  },
  {
    icon: '✅',
    title: 'Gestão da Qualidade',
    description:
      'Implementa sistemas de garantia e controle da qualidade para produtos e processos, assegurando conformidade com normas e satisfação do cliente.',
    tools: ['ISO 9001', 'CEP', 'FMEA', 'Six Sigma', 'Auditorias'],
  },
  {
    icon: '📋',
    title: 'Gestão de Projetos',
    description:
      'Lidera e coordena projetos de qualquer natureza, desde implantação de fábricas até desenvolvimento de novos produtos, gerenciando escopo, prazo, custo e risco.',
    tools: ['PMBOK', 'MS Project', 'Agile/Scrum', 'BIM', 'Cronograma'],
  },
  {
    icon: '💰',
    title: 'Gestão de Custos',
    description:
      'Analisa, controla e otimiza os custos de produção, contribuindo para a formação de preços competitivos e a rentabilidade das operações.',
    tools: ['Custeio ABC', 'CVL', 'Precificação', 'Budget', 'BOM'],
  },
  {
    icon: '🔄',
    title: 'Análise de Processos',
    description:
      'Mapeia, modela e redesenha processos organizacionais para eliminar desperdícios, reduzir lead time e aumentar a capacidade produtiva.',
    tools: ['BPM', 'VSM', 'BPMN', 'Mapeamento de Fluxo', 'Indicadores'],
  },
  {
    icon: '🌐',
    title: 'Supply Chain Management',
    description:
      'Gerencia a cadeia de suprimentos de ponta a ponta, desde o sourcing de fornecedores até a entrega ao cliente, garantindo visibilidade e resiliência.',
    // CONFIRMAR NO FIGMA: o vídeo corta esta lista
    tools: ['S&OP', 'Sourcing', 'Gestão de Fornecedores', 'Planejamento da Demanda'],
  },
  {
    icon: '🖥️',
    title: 'Tecnologia e Sistemas',
    description:
      'Lidera projetos de transformação digital e Industry 4.0, implementando ERP, IoT, BI e automação industrial para aumentar a competitividade.',
    // CONFIRMAR NO FIGMA: só "Industry 4.0" aparece no vídeo
    tools: ['ERP', 'IoT', 'BI', 'Automação', 'Industry 4.0'],
  },
]