'use client';

import { loginAction } from '@/actions/login/login-action';
import { toastMessage } from '@/adapters/toast-adapter';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

export function LoginForm() {
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  const initialState = {
    username: '',
    error: '',
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toastMessage.dismiss();
      toastMessage.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (created === '1') {
      toastMessage.dismiss();
      toastMessage.success('Usuário criado com sucesso');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className={clsx('flex-1 flex flex-col gap-6')}>
        <InputText
          type='text'
          labelText='Usuário'
          placeholder='Seu usuário ou e-mail'
          defaultValue={state.username}
          name='user'
          disabled={isPending}
        />

        <InputText
          type='password'
          placeholder='Sua senha'
          labelText='Senha'
          name='password'
          disabled={isPending}
        />

        <Button className='mt-4' type='submit' disabled={isPending}>
          <LogInIcon />
          Entrar
        </Button>
      </form>
    </div>
  );
}
