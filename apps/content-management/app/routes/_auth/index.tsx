import { getUserList } from '@/lib/actions/users';
import { Dashboard } from '@/pages/dashboard';
import { UserDashboard } from '@/pages/user';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  loader: async ({ context }) => {
    const users = await getUserList();

    return {
      users,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const state = Route.useLoaderData();
  const session = Route.useRouteContext().session;

  return <Dashboard user={session.user} isAdmin={session.isAdmin} />
}
