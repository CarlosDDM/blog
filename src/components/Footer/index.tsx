import clsx from 'clsx';
import { CurrentTime } from '../CurrentTime';
import { Suspense } from 'react';

export function Footer() {
  return (
    <footer className={clsx('pb-16', 'text-center')}>
      <Suspense fallback={<p>The Blog Copyright &copy;</p>}>
        <CurrentTime />
      </Suspense>
    </footer>
  );
}
