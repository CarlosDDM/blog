import clsx from 'clsx';

export function NoPosts() {
  return (
    <div
      className={clsx(
        'min-h-20',
        'mb-16',
        'text-center',
        'text-2xl',
        'flex',
        'justify-center',
        'items-center',
        'gap-6',
        'flex-col',
      )}
    >
      <p>Aguardando um novo post</p>
      <div className='flex items-center justify-center gap-4 h-6'>
        <span className='h-3 w-3 rounded-full bg-slate-950 animate-ping [animation-delay:-0.3s]'></span>
        <span className='h-3 w-3 rounded-full bg-slate-950 animate-ping [animation-delay:-0.15s]'></span>
        <span className='h-3 w-3 rounded-full bg-slate-950 animate-ping'></span>
      </div>
    </div>
  );
}
