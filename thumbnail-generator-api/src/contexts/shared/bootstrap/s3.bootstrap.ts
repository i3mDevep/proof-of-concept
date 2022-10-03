import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
} from '@aws-sdk/client-s3';
import { Options, Upload } from '@aws-sdk/lib-storage';

export class S3Bootstrap {
  private client: S3Client;

  getS3Client() {
    if (!this.client) {
      this.client = new S3Client({});
    }
    return this.client;
  }

  async getListObject(input: ListObjectsV2CommandInput) {
    const command = new ListObjectsV2Command(input);
    return this.getS3Client().send(command);
  }

  putObject(input: PutObjectCommandInput) {
    const command = new PutObjectCommand({
      ...input,
    });
    return this.getS3Client().send(command);
  }

  async getObject(input: GetObjectCommandInput) {
    const command = new GetObjectCommand({
      ...input,
    });
    const object = await this.getS3Client().send(command);
    const stream = object.Body;
    const buffer = await new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.once('end', () => resolve(Buffer.concat(chunks as []) as Buffer));
      stream.once('error', reject);
    });
    return { buffer, ...object };
  }

  async putObjectParalleUp(input: PutObjectCommandInput, options?: Options) {
    const parallelUpload = new Upload({
      client: this.getS3Client(),
      params: { ...input },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
      ...options,
    });

    await parallelUpload.done();
  }
}
