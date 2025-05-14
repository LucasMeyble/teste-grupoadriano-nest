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

      quietReqLogger: true,
      customLogLevel(req, res, err) {
        if (req.url.startsWith('/.well-known')) {
          return 'silent';
        }

        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
      },
    },
  }),
};
