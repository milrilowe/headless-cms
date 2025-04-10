import { useState, useEffect } from 'react';
import { Outlet, useRouter } from "@tanstack/react-router";
import {
    LogOut,
    Moon,
    Sun,
    Home,
    Users,
    GlobeIcon,
    User
} from 'lucide-react';
import { AdminFeature } from '@/components';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider
} from '@/components/ui/sidebar';
import { SessionUser } from '@/types';

export function AppLayout({ user, onLogout, children }: { user: SessionUser, onLogout: () => void, children: React.ReactNode }) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Handle theme toggle
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // After mount to avoid hydration mismatch with theme
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <SidebarProvider defaultOpen={true}>
                <div className="flex h-screen">
                    <Sidebar>
                        <SidebarHeader className="flex h-14 items-center px-4 border-b">
                            <h1 className="text-xl font-semibold">Blah Blah Blah</h1>
                        </SidebarHeader>

                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                onClick={() => router.navigate({ to: '/' })}
                                                tooltip="Dashboard"
                                                isActive={router.state.location.pathname === '/'}
                                            >
                                                <Home className="h-4 w-4" />
                                                <span>Home</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <AdminFeature user={user}>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton
                                                    onClick={() => router.navigate({ to: '/dashboard' })}
                                                    tooltip="Users Management"
                                                >
                                                    <Users className="h-4 w-4" />
                                                    <span>Users</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </AdminFeature>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                onClick={() => router.navigate({ to: '/profile' })}
                                                tooltip="Profile"
                                            >
                                                <User className="h-4 w-4" />
                                                <span>Profile</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>

                        <SidebarFooter className="border-t p-4">
                            <div className="flex items-center justify-end gap-2">
                                {mounted ? (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleTheme}
                                        className="h-8 w-8"
                                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                    >
                                        {theme === 'dark' ? (
                                            <Sun className="h-4 w-4" />
                                        ) : (
                                            <Moon className="h-4 w-4" />
                                        )}
                                    </Button>
                                ) : null}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onLogout}
                                    className="h-8 w-8 text-red-500 hover:text-red-600"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </SidebarFooter>
                    </Sidebar>
                </div>
                <main className="w-full flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </main>
            </SidebarProvider>

        </>
    );
}