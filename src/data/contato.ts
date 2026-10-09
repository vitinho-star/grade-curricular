export type ContatoItem = {
  icon: string
  label: string
  value: string
}

export const contatos: ContatoItem[] = [
  {
    icon: '📍',
    label: 'Endereço',
    value: 'Av. Darcy Vargas, UEA EST — Manaus, AM · Bloco A, Sala 15',
  },
  { icon: '📞', label: 'Telefone', value: '(92) 98128-9491' },
  { icon: '✉️', label: 'E-mail', value: 'caep.uea@gmail.com.br' },
  { icon: '🕒', label: 'Atendimento', value: 'Seg-Sex: 08h–12h e 14h–18h' },
]

export const coordenacao = {
  coordenador: 'Prof. Me. Carly Trindade',
  secretaria: 'Meire',
}