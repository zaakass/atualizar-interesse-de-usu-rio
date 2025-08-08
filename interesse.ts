import { supabase } from './supabaseClient'



export type Action = 'resposta' | 'curtida' | 'topico'

const SCORE_ACTIONS: Record<Action, number> = {
  resposta: 3,
  curtida: 1,
  topico: 5,
}

export async function atualizarInteresseUsuario(
  usuario_id: string,
  categoria: string,
  acao: Action,
): Promise<void> {
  const pontos = SCORE_ACTIONS[acao]
  if (!pontos) return

  const { error } = await supabase.rpc('upsert_interesse_usuario', {
    p_usuario_id: usuario_id,
    p_categoria: categoria,
    p_pontos: pontos,
  })

  if (error) console.error('Erro ao atualizar interesse_usuario:', error.message)
}
