import { LoginForm } from '@/components/admin/LoginForm';
import ErrorMessage from '@/components/ErrorMessage';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle='403'
        content='Libere o sistema de login usando o ALLOW_LOGIN.'
      />
    );
  }

  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <LoginForm />
    </Suspense>
  );
}
