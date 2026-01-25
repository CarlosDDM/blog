import ErrorMessage from '@/components/ErrorMessage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Página Não Encontrada',
  description: 'Erro 404 - A página que você esta tentando acessar não existe.',
};

export default function NotFoundPage() {
  return (
    <ErrorMessage
      content='Erro 404 - A página que você esta tentando acessar não existe.'
      contentTitle='404'
    />
  );
}
