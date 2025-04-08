import { useState, useEffect } from 'react';
import { Outlet, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from '@/lib/actions/auth';
import { LayoutDashboard, LogOut, Moon, Sun, Home } from 'lucide-react';
import { AdminFeature } from '@/components';
import { useTheme } from 'next-themes';
import { User } from '@prisma/client';

interface Props {
    user: User;
}

export function DashboardLayout({ user }: Props) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Handle theme toggle
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Handle logout action
    async function handleLogoutClick() {
        await logout();
        router.navigate({ to: '/login' });
    }

    // After mount to avoid hydration mismatch with theme
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Topbar */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-3 px-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Left side - Brand/Logo */}
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium">ABC</h1>
                    </div>

                    {/* Center - Navigation */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.navigate({ to: '/' })}
                            className="flex items-center"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Button>

                        {/* Only show Dashboard link for admins */}
                        <AdminFeature user={user}>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.navigate({ to: '/' })}
                                className="flex items-center"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </AdminFeature>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-2">

                        {/* Theme Toggle */}
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </Button>
                        )}

                        {/* Logout Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogoutClick}
                            className="text-red-500 hover:text-red-600"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="p-4 md:p-6 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}