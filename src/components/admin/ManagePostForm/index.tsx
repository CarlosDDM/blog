'use client';
import { Button } from '@/components/Button';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '../MarkDownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post-action';
import { toastMessage } from '@/adapters/toast-adapter';
import { updatePostAction } from '@/actions/post/update-post-action';
import { useRouter, useSearchParams } from 'next/navigation';

type ManagePostFormUpdateProps = {
  publicPost?: PublicPost;
  mode: 'update';
};

type ManagePostFormCreateProps = {
  publicPost?: PublicPost;
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;

  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  const { formState } = state;

  const [contentValue, setContentValue] = useState(formState.content);

  useEffect(() => {
    if (state.errors.length > 0) {
      toastMessage.dismiss();
      state.errors.forEach(error => toastMessage.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toastMessage.dismiss();
      toastMessage.success('Post atualizado com sucesso');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toastMessage.dismiss();
      toastMessage.success('Post criado com sucesso');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          placeholder='ID gerado automaticamente'
          labelText='ID'
          name='id'
          type='text'
          defaultValue={formState.id}
          readOnly
          disabled={isPending}
        />

        <InputText
          placeholder='Slug gerada automaticamente'
          labelText='Slug'
          name='slug'
          type='text'
          defaultValue={formState.slug}
          readOnly
          disabled={isPending}
        />

        <InputText
          placeholder='Digite o nome do autor'
          labelText='Autor'
          name='author'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          placeholder='Digite o título'
          labelText='Título'
          name='title'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          placeholder='Digite o resumo'
          labelText='Excerto'
          name='excerpt'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={isPending}
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
        />
        <ImageUploader disabled={isPending} />

        <InputText
          placeholder='Digite a url da imagem'
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckBox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className='mt-4'>
          <Button disabled={isPending}>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
