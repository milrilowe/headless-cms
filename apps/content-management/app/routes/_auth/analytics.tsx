import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/analytics"!</div>
}
