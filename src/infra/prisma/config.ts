import { defineConfig } from '@prisma/config';
import { env } from '@/config/app.config';

export default defineConfig({
  datasource: {
    //URL que estava no .env
    url: env.DATABASE_URL,
  },
});
