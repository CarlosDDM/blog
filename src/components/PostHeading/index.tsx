import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};
export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: clsx('text-3xl', 'sm:text-4xl', 'font-extrabold'),
    h2: clsx('text-2xl', 'sm:text-3xl', 'font-bold'),
  };

  return (
    <Tag className={clsx(headingClassesMap[Tag])}>
      <Link className={clsx('hover:text-slate-500')} href={url}>
        {children}
      </Link>
    </Tag>
  );
}
