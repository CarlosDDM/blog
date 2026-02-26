'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { toastMessage } from '@/adapters/toast-adapter';
import { Button } from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useTransition } from 'react';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled }: ImageUploaderProps) {
  const imageUpaloadInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  const { NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE } = process.env;
  const imageUploaderMaxSize =
    Number(NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

  function handleUploadImage() {
    if (!imageUpaloadInputRef.current) return;

    imageUpaloadInputRef.current.click();
  }

  function handleOnChange() {
    toastMessage.dismiss();

    if (!imageUpaloadInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = imageUpaloadInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > imageUploaderMaxSize) {
      const readableMaxSize = imageUploaderMaxSize / 1024;
      toastMessage.error(`Imagem muito grande. Máx.: ${readableMaxSize}KB.`);
      setImgUrl('');
      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toastMessage.error(result.error);
        setImgUrl('');
        fileInput.value = '';
        return;
      }
      setImgUrl(result.url);
      toastMessage.success('Imagem enviada com successo.');
    });
    fileInput.value = '';
  }

  return (
    <div className='flex flex-col px-2 py-4'>
      <Button
        className='self-start'
        onClick={handleUploadImage}
        type='button'
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>
      <input
        onChange={handleOnChange}
        ref={imageUpaloadInputRef}
        className='hidden'
        type='file'
        name=''
        accept='image/*'
        disabled={isUploading || disabled}
      />
      {!!imgUrl && (
        <div className='flex flex-col gap-4 py-4'>
          <p className='py-2 text-xs sm:text-xl'>
            <b>URL: {imgUrl}</b>
          </p>
          <div className='relative w-full aspect-video'>
            <Image
              fill
              alt='Imagem enviada'
              className='rounded-lg object-cover'
              src={imgUrl}
              sizes='(max-width: 768px) 100vw, 800px'
            />
          </div>
        </div>
      )}
    </div>
  );
}
