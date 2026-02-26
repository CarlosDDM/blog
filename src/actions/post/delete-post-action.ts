'use server';
import { getLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    return {
      error:
        'Usuário não autenticado, faça o login em outra aba e tente novamente',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  let post;

  try {
    post = await postRepository.deleteById(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    return {
      error: 'Erro desconhecido',
    };
  }

  revalidateTag('find-all', 'max');
  revalidateTag(`post-${post.slug}`, 'max');
  revalidateTag(`post-${post.id}`, 'max');
  revalidateTag(`find-all-admin`, 'max');
  revalidatePath('/admin/post');
  revalidatePath(`/`);
  return {
    error: '',
  };
}
