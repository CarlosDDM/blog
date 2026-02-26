'use client';
import { deletePostAction } from '@/actions/post/delete-post-action';
import { toastMessage } from '@/adapters/toast-adapter';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleCancel() {
    setShowDialog(false);
  }

  function handleConfirm() {
    toastMessage.dismiss();
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toastMessage.error(result.error);
        return;
      }

      toastMessage.success('Post apagado com sucesso.');
    });
  }
  return (
    <>
      <button
        onClick={handleClick}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        disabled={isPending}
        className={clsx(
          'cursor-pointer',
          'text-red-600',
          'transition-all',
          'ease-in-out',
          'delay-75',
          'hover:scale-120',
          'hover:text-red-500',
          'disabled:text-slate-500',
          'disabled:cursor-not-allowed',
        )}
      >
        <Trash2Icon size={20} />
      </button>
      {showDialog && (
        <Dialog
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title='Apagar post?'
          content={
            <p>
              Tem certeza que quer apagar o post: <b>{title}</b>
            </p>
          }
          isVisible={showDialog}
          disabled={isPending}
        />
      )}
    </>
  );
}
