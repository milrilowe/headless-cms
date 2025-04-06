import { Dashboard } from '@/pages/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_dashboardLayout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}
