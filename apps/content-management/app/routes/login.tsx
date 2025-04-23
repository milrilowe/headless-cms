import { getSession } from '@/lib/actions/auth'
import { Login } from '@/pages/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const session = await getSession();

    if (session) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Login />
}
