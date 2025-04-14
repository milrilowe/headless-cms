import { getSitesByUserId } from '@/lib/actions/sites';
import { User } from '@/pages/user'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/user/$userId')({
  loader: async () => {
    const sites = await getSitesByUserId({ data: { userId: 1 } });
    return { sites };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { sites } = Route.useLoaderData();

  return <User sites={sites} />
}
