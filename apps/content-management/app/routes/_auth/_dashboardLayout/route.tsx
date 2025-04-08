import { NotFound } from '@/components'
import { DashboardLayout } from '@/layouts'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_dashboardLayout')({
  component: DashboardLayout,
  notFoundComponent: () => <NotFound />,

})