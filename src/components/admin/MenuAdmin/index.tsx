'use client';

import {
  CircleXIcon,
  FileTextIcon,
  Hourglass,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { log } from 'console';
import { logoutAction } from '@/actions/login/logout-action';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'bg-slate-900',
    'text-slate-100',
    'rounded-lg',
    'flex',
    'flex-col',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'mb-8',
    'sm:flex-row',
    'sm:flex-wrap',
    'sm:h-auto',
  );
  const linkClasses = clsx(
    'flex',
    'items-center',
    'justify-start',
    'px-4',
    'gap-2',
    'transition',
    'rounded-lg',
    'hover:bg-slate-600',
    'h-10',
    'shrink-0',
    'cursor-pointer',
  );

  const openCloseBtnClasses = clsx(
    linkClasses,
    ' text-blue-200 italic, sm:hidden',
  );

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen(s => !s)}
        className={openCloseBtnClasses}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>
      <Link className={linkClasses} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>
      <Link className={linkClasses} href='/admin/post/new'>
        <PlusIcon />
        Criar post
      </Link>
      <a onClick={handleLogout} className={linkClasses} href=''>
        {isPending && (
          <>
            <Hourglass className='animate-spin' />
            Saindo...
          </>
        )}
        {!isPending && (
          <>
            <LogOutIcon />
            Logout
          </>
        )}
      </a>
    </nav>
  );
}
