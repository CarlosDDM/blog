'use client';
import ErrorMessage from '@/components/ErrorMessage';
import { Metadata } from 'next';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export const metadata: Metadata = {
  title: 'Internal Server Error',
  description: 'An error occurred while tryind to access the website.',
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <ErrorMessage
      contentTitle='501 - Internal Server Error'
      content='Ocorreu um erro do qual nossa aplicação não conseguiu se recuperar.'
    />
  );
}
