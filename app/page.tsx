import { redirect } from 'next/navigation'

// Redirect bare root to the admin dashboard
export default function RootPage() {
  redirect('/es/admin')
}
