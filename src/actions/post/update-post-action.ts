'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto';
import { getLoginSession } from '@/lib/login/manage-login';
import { PostCreateSchema } from '@/lib/post/validations';
import { postRepository } from '@/repositories/post';
import { errorMaker } from '@/utils/error-maker';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandomString } from '@/utils/make-random-string';
import { revalidateTag } from 'next/cache';

export type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return errorMaker({
      formState: prevState.formState,
      msg: ['Dados inválidos'],
    });
  }

  const id = formData.get('id')?.toString() || '';
  if (!id || typeof id !== 'string') {
    return errorMaker({
      formState: prevState.formState,
      msg: ['Id inváçodp'],
    });
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return errorMaker({
      formState: makePartialPublicPost(formDataToObj),
      msg: [
        'Usuário não autenticado, faça o login em outra aba e tente novamente',
      ],
    });
  }

  if (!zodParsedObj.success) {
    const erros = getZodErrorMessages(zodParsedObj.error);
    console.log(erros);
    return errorMaker({
      formState: makePartialPublicPost(formDataToObj),
      msg: erros,
    });
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.updatePost(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return errorMaker({
        formState: makePartialPublicPost(formDataToObj),
        msg: [e.message],
      });
    }

    return errorMaker({
      formState: makePartialPublicPost(formDataToObj),
      msg: ['Error desconhecido'],
    });
  }

  revalidateTag(`post-${post.slug}`, 'max');
  revalidateTag(`post-${post.id}`, 'max');
  revalidateTag('find-all', 'max');

  return errorMaker({
    formState: makePublicPostFromDb(post),
    situation: makeRandomString(),
  });
}
