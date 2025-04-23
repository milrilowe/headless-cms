import { getSitesByUserId } from '@/lib/actions/sites';
import { getUserById } from '@/lib/actions/users';
import { UserDashboard } from '@/pages/user';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_auth/user/$userId')({
  loader: async ({ params }) => {
    const { userId } = params;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const userIdNumber = parseInt(userId);

    if (isNaN(userIdNumber) || userIdNumber <= 0) {
      throw new Error('Invalid User ID');
    }

    // Await both promises directly
    const user = await getUserById({ data: { userId: userIdNumber } });
    const sites = await getSitesByUserId({ data: { userId: userIdNumber } });

    if (!user) {
      throw new Error('User not found');
    }

    return { user, sites };
  },
  // This will show during loading
  pendingComponent: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin mr-2">⍥</div>
      Loading user data...
    </div>
  ),
  component: UserComponent,
})

function UserComponent() {
  const { user, sites } = Route.useLoaderData();

  return <UserDashboard user={user} sites={sites} />;
}