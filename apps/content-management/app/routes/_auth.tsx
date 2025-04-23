import { NotFound } from '@/components'
import { AppLayout } from '@/layouts/AppLayout';
import { getSession, logout } from '@/lib/actions/auth';
import { createFileRoute, Outlet, redirect, useLoaderData, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ context }) => {
        try {
            const session = await getSession();

            if (!session.user) {
                throw redirect({ to: "/login" })
            }

            return {
                session
            }
        } catch (error) {
            throw redirect({ to: "/login" })
        }
    },
    component: RouteLayout,
})

function RouteLayout() {
    const { session } = Route.useRouteContext();
    const router = useRouter();

    async function handleLogout() {
        await logout();
        router.invalidate();
    }

    return (
        <AppLayout
            user={session.user}
            onLogout={handleLogout}
            isAdmin={session.isAdmin}
        />
    )
}
