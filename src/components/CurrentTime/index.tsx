'use client';

import Link from 'next/link';

export function CurrentTime() {
  return (
    <p>
      <span>Copyright &copy; {new Date().getFullYear()} - </span>
      <Link href='/'>The Blog</Link>
    </p>
  );
}
