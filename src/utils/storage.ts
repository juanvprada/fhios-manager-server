import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../config/env.config';

const s3Client = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (file: Express.Multer.File): Promise<string> => {
  const key = `documents/${Date.now()}-${file.originalname}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return `https://${config.AWS_BUCKET_NAME}.s3.${config.AWS_REGION}.amazonaws.com/${key}`;
};

export const deleteFile = async (filePath: string): Promise<void> => {
  const key = filePath.split('/').pop()!;

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.AWS_BUCKET_NAME,
      Key: key,
    })
  );
};