import clsx from 'clsx';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className={clsx('pb-16', 'text-center')}>
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <Link href='/'>The Blog</Link>
      </p>
    </footer>
  );
}
