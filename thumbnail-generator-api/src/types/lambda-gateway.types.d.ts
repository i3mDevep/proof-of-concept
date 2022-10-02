import type { APIGatewayProxyEvent } from 'aws-lambda';

export type FileBody = {
  filename: string;
  mimetype: string;
  encoding: string;
  truncated: boolean;
  content: Buffer;
};

export type FileAPIGatewayProxyEvent = Omit<APIGatewayProxyEvent, 'body'> & {
  body: {
    imagen: string;
  };
};
