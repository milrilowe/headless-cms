import { NotFound } from '@/components'
import { DashboardLayout } from '@/layouts'
import { getCurrentUser } from '@/lib/actions/auth';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_dashboardLayout')({
  loader: async ({ context }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw redirect({ to: '/login'});
    }

    return {
      user
    }
  },
  component: RouteLayout,
  notFoundComponent: () => <NotFound />,

})

function RouteLayout() {
  const user = Route.useRouteContext().user;

  return (
    <DashboardLayout user={user} />
  )
}