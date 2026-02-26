'use server';

import { makePartialUser, PublicUser } from '@/dto/user/dto';
import { getLoginSession, hashPassword } from '@/lib/login/manage-login';
import { UserFinalSchema } from '@/lib/user/validation';
import { postRepository } from '@/repositories/post';
import { errorMaker } from '@/utils/error-maker';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

export type CreateUserActionState = {
  errors: string[];
  success?: string;
  formState: PublicUser;
};

export async function createUserAction(
  prevState: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  if (!(formData instanceof FormData)) {
    return errorMaker({
      formState: prevState.formState,
      msg: ['Dados inválidos'],
    });
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UserFinalSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const erros = getZodErrorMessages(zodParsedObj.error);

    return errorMaker({
      formState: makePartialUser(formDataToObj),
      msg: erros,
    });
  }

  const validUserData = zodParsedObj.data;
  const newUser = {
    ...validUserData,
    email: validUserData.email,
    username: validUserData.username,
    password: await hashPassword(validUserData.password),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4().replaceAll('-', ''),
  };

  try {
    await postRepository.createUser(newUser);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return errorMaker({
        formState: makePartialUser(newUser),
        msg: [e.message],
      });
    }
  }

  redirect('/admin/login?created=1');
}
