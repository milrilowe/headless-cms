import { ISite, IUser } from "@/types"
import { SiteCard, CreateSiteForm, EmptyState } from "./components"
import { useState } from "react"

interface SiteManagerProps {
    sites: Array<ISite>
    user: IUser
}

export function SiteManager({ sites, user }: SiteManagerProps) {
    const [isCreating, setIsCreating] = useState(false)
    const hasSite = sites.length > 0

    return (
        <div className="space-y-8">
            {hasSite ? <SiteCard site={sites[0]} /> : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Create New Site</h1>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                    <CreateSiteForm
                        user={user}
                        onSuccess={() => setIsCreating(false)}
                    />
                </div>
            )}
        </div>
    )
}
