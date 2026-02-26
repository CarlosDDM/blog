'use client';

import { createUserAction } from '@/actions/user/create-user-action';
import { toastMessage } from '@/adapters/toast-adapter';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { makePartialUser } from '@/dto/user/dto';
import { useActionState, useEffect, useRef, useState } from 'react';

export function SignupForm() {
  const inputConfirmPassword = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState(false);

  let publicUser;

  const initialState = {
    formState: makePartialUser(publicUser),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createUserAction,
    initialState,
  );

  const { formState } = state;

  useEffect(() => {
    const input = inputConfirmPassword.current;
    if (!input) return;

    if (!passwordError) {
      input.classList.remove('!ring-red-500');
    } else {
      input.classList.add('!ring-red-500');
    }
  }, [passwordError]);

  useEffect(() => {
    if (state.errors.length > 0) {
      toastMessage.dismiss();
      state.errors.forEach(error => {
        toastMessage.error(error);
      });
    }
  }, [state.errors]);

  function validatePasswords() {
    if (!inputPassword.current || !inputConfirmPassword.current) return;

    const pass = inputPassword.current.value;
    const confirm = inputConfirmPassword.current.value;

    if (confirm && pass !== confirm) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }
  return (
    <div className='mb-16'>
      <form action={action} className='max-w-sm mx-auto flex flex-col gap-6'>
        <InputText
          placeholder='Digite o nome do seu usuário'
          labelText='Nome'
          type='text'
          name='username'
          disabled={isPending}
          defaultValue={formState.username}
          required
        />
        <InputText
          placeholder='Digite o seu e-mail'
          labelText='E-mail'
          type='email'
          name='email'
          disabled={isPending}
          defaultValue={formState.email}
          required
        />
        <InputText
          onChange={validatePasswords}
          ref={inputPassword}
          placeholder='Crie uma senha'
          labelText='Senha'
          type='password'
          name='password'
          disabled={isPending}
          required
        />
        <InputText
          onChange={validatePasswords}
          ref={inputConfirmPassword}
          placeholder='Digite novamente a senha'
          labelText='Confirme sua senha'
          type='password'
          name='confirmPassword'
          disabled={isPending}
          required
        />
        {passwordError && (
          <div>
            <span className='text-red-500'>
              <b>As senhas não coicidem.</b>
            </span>
          </div>
        )}
        <Button className='mt-4' type='submit' disabled={isPending}>
          Criar conta
        </Button>
      </form>
    </div>
  );
}
