import type React from "react"

import type { IUser } from "@/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, ChevronLeft, ChevronRight, CreditCard, Globe, LayoutDashboard, Settings, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { getInitials } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

interface DashboardSidebarProps {
    user: IUser
    isOpen: boolean
    onToggle: () => void
}

export function DashboardSidebar({ user, isOpen, onToggle }: DashboardSidebarProps) {
    const initials = getInitials(user.name || "User Name")

    // Calculate usage percentages (mock data)
    const storageUsage = 35
    const bandwidthUsage = 12

    return (
        <div
            className={cn(
                "bg-background border-r transition-all duration-300 flex flex-col h-screen sticky top-0",
                isOpen ? "w-64" : "w-16",
            )}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <div className={cn("flex items-center gap-2", !isOpen && "hidden")}>
                    <Globe className="h-6 w-6 text-primary" />
                    <span className="font-bold">SiteManager</span>
                </div>
                <Globe className={cn("h-6 w-6 text-primary", isOpen && "hidden")} />
                <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
                    {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
            </div>

            <div className="flex-1 overflow-auto py-4">
                <nav className="space-y-1 px-2">
                    <NavItem href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" isOpen={isOpen} />
                    <NavItem href="/sites" icon={<Globe className="h-4 w-4" />} label="Sites" isOpen={isOpen} />
                    <NavItem href="/analytics" icon={<BarChart3 className="h-4 w-4" />} label="Analytics" isOpen={isOpen} />
                    <NavItem href="/team" icon={<Users className="h-4 w-4" />} label="Team" isOpen={isOpen} />
                    <NavItem href="/billing" icon={<CreditCard className="h-4 w-4" />} label="Billing" isOpen={isOpen} />
                    <NavItem href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" isOpen={isOpen} />
                </nav>
            </div>

            {isOpen && (
                <div className="p-4 border-t">
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
                </div>
            )}

            <div className="border-t p-4">
                <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={"/placeholder.svg"} alt={user.name || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    {isOpen && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface NavItemProps {
    href: string
    icon: React.ReactNode
    label: string
    isOpen: boolean
}

function NavItem({ href, icon, label, isOpen }: NavItemProps) {
    return (
        <Link
            to={href}
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors",
                !isOpen && "justify-center px-2",
            )}
        >
            {icon}
            {isOpen && <span>{label}</span>}
        </Link>
    )
}
