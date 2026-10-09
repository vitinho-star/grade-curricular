import { useEffect } from 'react'

const SITE = 'Engenharia de Produção'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === SITE ? SITE : `${title} | ${SITE}`

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}