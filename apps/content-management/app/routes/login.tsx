import { getCurrentUser } from '@/lib/actions/auth'
import { Login } from '@/pages/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const user = await getCurrentUser();
    if (user) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Login />
}
