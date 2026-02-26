'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { getLoginSession } from '@/lib/login/manage-login';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/posts/post-model';
import { postRepository } from '@/repositories/post';
import { errorMaker } from '@/utils/error-maker';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

export type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return errorMaker({
      formState: prevState.formState,
      msg: ['Dados inválidos'],
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
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4().replaceAll('-', ''),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.createPost(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return errorMaker({
        formState: newPost,
        msg: [e.message],
      });
    }

    return errorMaker({
      formState: newPost,
      msg: ['Error desconhecido'],
    });
  }

  revalidateTag('find-all', 'default');
  revalidatePath('/');
  revalidatePath('/admin/post');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
