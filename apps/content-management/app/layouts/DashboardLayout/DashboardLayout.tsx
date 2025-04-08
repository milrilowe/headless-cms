import { Button } from "@/components/ui/button"
import { Outlet, redirect, useRouter } from "@tanstack/react-router"
import { logout } from '@/lib/actions/auth'

export function DashboardLayout() {
    const router = useRouter();

    async function handleLogoutClick() {
        await logout();
        router.invalidate();
    }

    return (
        <div>
            <h1>Dashboard Layout</h1>
            <Button onClick={handleLogoutClick}>Logout</Button>
            <Outlet />
        </div>
    )
}