import { createServerClient } from './server'

/**
 * Returns the authenticated user from the service-role client,
 * using the Authorization header (Bearer token) sent by the browser client.
 * Used in API route handlers to verify admin sessions.
 */
export async function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null

  const token = authHeader.slice(7)
  const supabase = createServerClient()
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return null
  return data.user
}
