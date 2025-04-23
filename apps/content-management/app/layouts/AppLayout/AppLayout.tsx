import { useState, useEffect } from 'react';
import { Outlet } from "@tanstack/react-router";
import {
    BarChart3,
    CreditCard,
    Globe,
    LayoutDashboard,
    Moon,
    Settings,
    Sun,
    Users
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/lib/utils";
import type { IUser } from "@/types";
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
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar';

interface DashboardLayoutProps {
    user: IUser;
    isAdmin?: boolean;
}

export function AppLayout({ user, isAdmin = false }: DashboardLayoutProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Calculate usage percentages (mock data)
    const storageUsage = 35;
    const bandwidthUsage = 12;

    // After mount to avoid hydration mismatch with theme
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle theme toggle
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const initials = getInitials(user.name || "User Name");

    const navigationItems = [
        { href: "/", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
        ...(isAdmin ? [{ href: "/admin", icon: <Users className="h-4 w-4" />, label: "Admin" }] : []),
        { href: "/sites", icon: <Globe className="h-4 w-4" />, label: "Sites" },
        { href: "/analytics", icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
        { href: "/team", icon: <Users className="h-4 w-4" />, label: "Team" },
        { href: "/billing", icon: <CreditCard className="h-4 w-4" />, label: "Billing" },
        { href: "/settings", icon: <Settings className="h-4 w-4" />, label: "Settings" },
    ];

    return (
        <SidebarProvider defaultOpen={true}>
            <Sidebar>
                <SidebarHeader className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <Globe className="h-6 w-6 text-primary" />
                        <span className="font-bold">SiteManager</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigationItems.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            onClick={() => window.location.href = item.href}
                                            tooltip={item.label}
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Usage</SidebarGroupLabel>
                        <SidebarGroupContent className="px-4 py-2">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Storage</span>
                                        <span className="font-medium">{storageUsage}%</span>
                                    </div>
                                    <Progress value={storageUsage} className="h-1" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Bandwidth</span>
                                        <span className="font-medium">{bandwidthUsage}%</span>
                                    </div>
                                    <Progress value={bandwidthUsage} className="h-1" />
                                </div>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={"/placeholder.svg"} alt={user.name || "User"} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>

                        {mounted && (
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
                        )}
                    </div>
                </SidebarFooter>
            </Sidebar>

            <main className="flex-1 overflow-auto">
                <div className="">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
}