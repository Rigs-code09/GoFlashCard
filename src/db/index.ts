import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Configure Neon client with standard settings
const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    cache: 'no-store',
  },
});

export const db = drizzle({ client: sql }); 