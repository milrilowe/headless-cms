import { NotFound } from '@/components'
import { AppLayout } from '@/layouts/AppLayout';
import { getCurrentUser, logout } from '@/lib/actions/auth';
import { createFileRoute, Outlet, redirect, useLoaderData, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ context }) => {
        const user = await getCurrentUser();

        if (!user) {
            throw redirect({ to: "/login" })
        }

        return {
            user,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
        }

    },
    component: RouteLayout,
    notFoundComponent: () => <NotFound />,
})

function RouteLayout() {
    const { user } = Route.useRouteContext();
    const router = useRouter();

    return (
        <AppLayout
            user={user}
            onLogout={async () => {
                await logout();
                router.invalidate();
            }
            }
        >
            <Outlet />
        </AppLayout >
    )
}
