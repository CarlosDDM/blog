import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const { S3_REGION, S3_KEY_ID, S3_SECRET_KEY, S3_API_URL, S3_BUCKET } =
  process.env;

if (!S3_REGION || !S3_KEY_ID || !S3_SECRET_KEY || !S3_API_URL || !S3_BUCKET) {
  throw new Error('Faltam variáveis de ambiente para a configuração do S3.');
}

const s3Client = new S3Client({
  region: S3_REGION,
  endpoint: S3_API_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: S3_KEY_ID,
    secretAccessKey: S3_SECRET_KEY,
  },
});

export async function uploadFileToS3(file: File, buffer: Buffer) {
  const fileToUpload = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
  });

  return s3Client.send(fileToUpload);
}
