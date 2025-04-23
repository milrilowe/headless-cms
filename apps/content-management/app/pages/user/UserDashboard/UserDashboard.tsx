import type { ISite, IUser } from "@/types"
import { SiteManager, UserHeader, DashboardSidebar } from "./components"
import { useState } from "react"

interface UserDashboardProps {
    sites: Array<ISite>
    user: IUser
}

export function UserDashboard({ sites, user }: UserDashboardProps) {

    return (
        <div className="flex min-h-screen bg-muted/30">
            <div className="flex-1 flex flex-col">
                <UserHeader user={user} />

                <main className="flex-1 p-6">
                    <div className="mx-auto max-w-6xl">
                        <SiteManager sites={sites} user={user} />
                    </div>
                </main>
            </div>
        </div>
    )
}