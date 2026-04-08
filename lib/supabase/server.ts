import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client using the service role key.
 * Only use in API Route Handlers and Server Components — never expose to the browser.
 * We use `any` for the Database generic to avoid complex type generation;
 * query results are cast to our manual types in lib/supabase/types.ts.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
