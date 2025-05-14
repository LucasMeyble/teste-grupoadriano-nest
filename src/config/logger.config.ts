import { LoggerModuleAsyncParams } from 'nestjs-pino';
import { Params } from 'nestjs-pino';

export const loggerConfig: LoggerModuleAsyncParams = {
  useFactory: (): Params => ({
    pinoHttp: {
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
                singleLine: true,
              },
            }
          : undefined,
    },
  }),
};
