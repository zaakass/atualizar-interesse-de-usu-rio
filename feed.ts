import { supabase } from './supabaseClient'



export interface FeedItem {
  id: string
  titulo: string
  conteudo: string
  comunidade_id: string
  criado_em: string
  peso_interesse: number
}

export async function getPersonalizedFeed(
  usuario_id: string,
  limitPerCategory = 5,
): Promise<FeedItem[]> {
  const { data: interesses, error: err1 } = await supabase
    .from('interesse_usuario')
    .select('categoria, peso')
    .eq('usuario_id', usuario_id)
    .order('peso', { ascending: false })
    .limit(5)

  if (err1 || !interesses) {
    console.error('Erro ao buscar interesses:', err1?.message)
    return []
  }

  const allItems: FeedItem[] = []

  for (const { categoria, peso } of interesses) {
    const { data: topicos, error: err2 } = await supabase
      .from('topicos')
      .select('id, titulo, conteudo, comunidade_id, criado_em')
      .eq('comunidade_id', categoria)
      .order('criado_em', { ascending: false })
      .limit(limitPerCategory)

    if (err2 || !topicos) {
      console.error(`Erro ao buscar tópicos na categoria ${categoria}:`, err2?.message)
      continue
    }

    allItems.push(
      ...topicos.map((t) => ({ ...t, peso_interesse: peso }))
    )
  }

  return allItems.sort((a, b) => {
    const d1 = new Date(a.criado_em).getTime()
    const d2 = new Date(b.criado_em).getTime()
    return b.peso_interesse - a.peso_interesse || d2 - d1
  })
}
