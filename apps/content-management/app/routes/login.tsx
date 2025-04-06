import { Login } from '@/pages/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/" })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Login />
}
