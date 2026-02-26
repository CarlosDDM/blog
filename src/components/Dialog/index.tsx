'use client';

import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  title: string;
  content: React.ReactNode;
  isVisible?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  onCancel,
  onConfirm,
  title,
  content,
  isVisible = false,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }
  return (
    <div
      className={clsx(
        'fixed',
        'z-50',
        'inset-0',
        'bg-black/50',
        'backdrop-blur-xs',
        'flex',
        'items-center',
        'justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100',
          'p-6',
          'rounded-lg',
          'max-w-2xl',
          'mx-6',
          'flex',
          'flex-col',
          'gap-6',
          'shadow-lg',
          'shadow-slate-950/40',
          'text-center',
        )}
        onClick={e => e.stopPropagation()}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
      >
        <h3 id='dialog-title' className='text-xl font-extrabold'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex items-center justify-around'>
          <Button
            variant='ghost'
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant='default' onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
