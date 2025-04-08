import { getMySites } from '@/lib/actions/sites';
import { getUserList } from '@/lib/actions/users';
import { Dashboard } from '@/pages/dashboard'
import { createFileRoute, redirect, useLoaderData, useRouter } from '@tanstack/react-router'
import { use } from 'react';

export const Route = createFileRoute('/_auth/_dashboardLayout/')({
  loader: async ({ context }) => {
    const users = await getUserList();
    const sites = await getMySites();

    return {
      users,
      sites
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const state = Route.useLoaderData();
  const user = Route.useRouteContext().user;

  const { users, sites } = state

  return <Dashboard user={user} users={users} sites={sites} />
}
