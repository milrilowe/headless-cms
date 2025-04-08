import { Dashboard } from '@/pages/dashboard'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_dashboardLayout/')({
  loader: ({context}) => {
    const { user } = context;
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    const users = [];
    const sites = [];

    if (user.role == 'admin') {
      
    }


    return {
      users: [],
      sites: [],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const state = Route.useLoaderData();
  const { users, sites } = state

  console.log('users', users)

  return <Dashboard />
}
