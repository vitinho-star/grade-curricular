import { supabase } from './supabase'

const BUCKET = 'avisos'
export const TAMANHO_MAXIMO = 3 * 1024 * 1024

const extensoes: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export function validarImagem(arquivo: File): string | null {
  if (!(arquivo.type in extensoes)) {
    return 'Use uma imagem JPG, PNG ou WebP.'
  }
  if (arquivo.size > TAMANHO_MAXIMO) {
    return 'A imagem deve ter no máximo 3 MB.'
  }
  return null
}

export async function enviarImagem(arquivo: File): Promise<string> {
  const caminho = `${crypto.randomUUID()}.${extensoes[arquivo.type]}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(caminho, arquivo, {
      contentType: arquivo.type,
      cacheControl: '31536000',
    })

  if (error) throw error

  return supabase.storage.from(BUCKET).getPublicUrl(caminho).data.publicUrl
}

export async function removerImagem(url: string | null): Promise<void> {
  if (!url) return

  const marcador = `/${BUCKET}/`
  const indice = url.indexOf(marcador)
  if (indice === -1) return

  const caminho = decodeURIComponent(url.slice(indice + marcador.length))
  await supabase.storage.from(BUCKET).remove([caminho])
}