import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Este é o blog feito com NEXT.js',
    template: '%s | The Blog',
  },
  description: 'The Blog - NEXT.js',
};

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
