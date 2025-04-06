import { Button } from "@/components/ui/button"
import { Outlet, redirect } from "@tanstack/react-router"
import { logout } from '@/lib/actions/auth'

export function DashboardLayout() {

    function handleLogoutClick() {
        logout();
        redirect({ to: "/login" })
    }

    return (
        <div>
            <h1>Dashboard Layout</h1>
            <Button onClick={handleLogoutClick}>Logout</Button>
            <Outlet />
        </div>
    )
}