import { Profile } from '@/pages/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
