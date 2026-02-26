'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await asyncDelay(1000);

  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login desabilitado',
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  const user = formData.get('user')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  if (typeof user !== 'string' || typeof password !== 'string') {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  const validUser = await postRepository.findUser(user);
  if (!validUser) {
    return {
      username: user,
      error: 'Usuário ou senha inválidos',
    };
  }
  const validPassword = await verifyPassword(password, validUser.password);

  if (!validPassword) {
    return {
      username: user,
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(validUser?.username);
  redirect('/admin/post');
}
