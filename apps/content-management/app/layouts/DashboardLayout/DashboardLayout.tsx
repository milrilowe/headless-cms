import { useState } from 'react';
import { Outlet, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from '@/lib/actions/auth';
import { LayoutDashboard, Users, Globe, LogOut, Menu, X } from 'lucide-react';
import { AdminFeature } from '@/components';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
    const router = useRouter();
    const user = getCurrentUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    async function handleLogoutClick() {
        await logout();
        router.invalidate();
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Mobile Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-3 px-4 md:hidden">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg font-medium">Dashboard</h1>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 md:translate-x-0 md:static",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex flex-col h-full">
                        {/* Mobile Close Button */}
                        <div className="md:hidden p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                            <span className="font-semibold">Menu</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleSidebar}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Sidebar Logo/Header */}
                        <div className="hidden md:flex p-4 items-center border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-lg font-semibold">Content Management</h1>
                        </div>



                        {/* Navigation Items */}
                        <nav className="py-4 flex-1">
                            <ul className="space-y-1 px-2">
                                <li>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        onClick={() => router.navigate({ to: '/' })}
                                    >
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </li>
                                <AdminFeature user={user}>
                                    {/* <li>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => router.navigate({ to: '/users' })}
                                        >
                                            <Users className="mr-2 h-4 w-4" />
                                            Users
                                        </Button>
                                    </li> */}
                                    {/* <li>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => router.navigate({ to: '/sites' })}
                                        >
                                            <Globe className="mr-2 h-4 w-4" />
                                            Sites
                                        </Button>
                                    </li> */}
                                </AdminFeature>
                            </ul>
                        </nav>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                variant="outline"
                                className="w-full justify-start text-red-500 hover:text-red-600"
                                onClick={handleLogoutClick}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="p-4 md:p-6 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Backdrop for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </div>
        </div>
    );
}