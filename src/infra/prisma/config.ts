import { defineConfig } from '@prisma/config';
import { env } from '@/config/env.config';

export default defineConfig({
  engine: 'classic',
  datasource: {
    //URL que estava no .env
    url: env.DATABASE_URL as string,
  },
});
