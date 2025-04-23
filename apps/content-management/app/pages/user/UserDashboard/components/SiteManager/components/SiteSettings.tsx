import type { ISite } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "@tanstack/react-router"

interface SiteSettingsProps {
    site: ISite
}

export function SiteSettings({ site }: SiteSettingsProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDeleteSite() {
        setIsDeleting(true)
        try {
            // Implement the delete site functionality here
            // await deleteSite({ id: site.id })
            toast.success("Site deleted successfully")
            await router.invalidate({ sync: true })
        } catch (error) {
            toast.error(`Failed to delete site: ${error instanceof Error ? error.message : "Unknown error"}`)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Site Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">Manage your site settings and configurations.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-medium">Storage Configuration</CardTitle>
                    <CardDescription>Configure your site's storage settings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between py-2 border-b">
                        <div className="font-medium">Region</div>
                        <div className="text-sm">{site.storageRegion}</div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <div className="font-medium">Storage Usage</div>
                        <div className="text-sm">0 MB / 5 GB</div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div className="font-medium">CDN Caching</div>
                        <div className="text-sm">Enabled</div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions for your site</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Deleting your site will permanently remove all associated data, content, and configurations. This action
                        cannot be undone.
                    </p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Site
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-destructive" />
                                    Delete Site
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete <span className="font-semibold">{site.name}</span>? This action cannot
                                    be undone and will permanently remove all your site data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteSite}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Deleting..." : "Delete Site"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}
