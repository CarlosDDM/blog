import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className={clsx('min-h-screen', 'text-slate-900', 'bg-slate-100')}>
      <div className={clsx('max-w-5xl', 'mx-auto', 'px-8')}>{children}</div>
    </div>
  );
}
