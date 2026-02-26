'use server';

import { getLoginSession } from '@/lib/login/manage-login';
import { adjustFileName } from '@/utils/adjust-filename';
import { uploadFileToS3 } from '@/utils/storage-s3';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const { NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE } = process.env;

  const imageUploaderMaxSize =
    Number(NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

  const isAuthenticated = await getLoginSession();

  const makeResult = ({ url = '', error = '' }) => {
    return { url, error };
  };

  if (!isAuthenticated) {
    return makeResult({
      url: '',
      error:
        'Usuário não autenticado, faça o login em outra aba e tente novamente',
    });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({
      error: 'Dados inválidos.',
    });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({
      error: 'Arquivo inválido.',
    });
  }

  if (file.size > imageUploaderMaxSize) {
    return makeResult({
      error: 'Arquivo muito grande.',
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({
      error: 'Imagem inválida',
    });
  }

  const newFileName = adjustFileName(file.name);
  const adjustedFile = {
    ...file,
    name: newFileName,
    type: file.type,
  };

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const { NEXT_PUBLIC_S3_WEB_ACCESS } = process.env;
  const nextPublicS3WebAccess = NEXT_PUBLIC_S3_WEB_ACCESS;
  if (!nextPublicS3WebAccess) {
    return makeResult({
      error: 'Problema na conexão ao servidor',
    });
  }

  try {
    await uploadFileToS3(adjustedFile, buffer);
    console.log(adjustedFile.type);
    return makeResult({ url: `${nextPublicS3WebAccess}/${newFileName}` });
  } catch (error) {
    return makeResult({
      error: `${error}`,
    });
  }
}
