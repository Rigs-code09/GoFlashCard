import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Configure Neon client with SSL fixes for development
const sql = neon(process.env.DATABASE_URL!, {
  // Disable SSL verification for local development
  fetchOptions: {
    cache: 'no-store',
  },
});

// In development, we need to handle SSL certificate issues
if (process.env.NODE_ENV !== 'production') {
  // This helps with local SSL certificate validation issues
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export const db = drizzle({ client: sql }); 