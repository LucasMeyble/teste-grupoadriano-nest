import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const rateLimitConfig: ThrottlerModuleOptions = {
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }
