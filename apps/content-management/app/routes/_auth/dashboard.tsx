import { getUserList } from '@/lib/actions/users';
import { Dashboard } from '@/pages/dashboard';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard')({
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
  const user = Route.useRouteContext().user;

  const { users } = state

  return <Dashboard user={user} users={users} />
}
