'use client';
import clsx from 'clsx';

type ErrorMessageProps = {
  contentTitle: string;
  content: React.ReactNode;
};

export default function ErrorMessage({
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      <div
        className={clsx(
          'min-h-80 bg-slate-900 text-slate-100',
          'mb-16 p-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-7xl/tight mb-4 font-extrabold'>{contentTitle}</h1>
          <div className='text-2xl'>{content}</div>
        </div>
      </div>
    </>
  );
}
