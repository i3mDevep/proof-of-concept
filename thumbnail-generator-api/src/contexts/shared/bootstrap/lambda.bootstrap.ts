/* eslint-disable class-methods-use-this */
import { Handler } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { ConstructorOptions } from '@aws-lambda-powertools/logger/lib/types';

export abstract class LambdaBootstrap<Event, Result> {
  public logger: Logger;

  constructor(loggerOptions: ConstructorOptions) {
    this.logger = new Logger(loggerOptions);
  }

  abstract handler: Handler<Event, Result>;

  formatJSONResponse = (
    response: Record<string, unknown>,
    statusCode = 200,
  ) => {
    return {
      statusCode,
      body: JSON.stringify(response),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
      },
    };
  };
}
