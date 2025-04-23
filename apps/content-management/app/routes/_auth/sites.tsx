import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/sites"!</div>
}
