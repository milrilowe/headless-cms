import { Button } from "@/components/ui/button"
import { PlusCircle, Globe } from "lucide-react"

interface EmptyStateProps {
    onCreateNew: () => void
}

export function EmptyState({ onCreateNew }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Globe className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">No sites yet</h2>
            <p className="text-muted-foreground max-w-md mb-6">
                You haven't created any sites yet. Get started by creating your first site.
            </p>
            <Button onClick={onCreateNew} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Create New Site
            </Button>
        </div>
    )
}
