import type { ISite } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdateSiteForm, SitePreview, SiteAnalytics, SiteSettings } from "."
import { Globe, BarChart3, Settings, Edit3 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface SiteCardProps {
    site: ISite
}

export function SiteCard({ site }: SiteCardProps) {
    const createdAt = new Date(site.createdAt || Date.now())
    const updatedAt = new Date(site.updatedAt || Date.now())

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{site.name}</CardTitle>
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                Active
                            </Badge>
                        </div>
                        <CardDescription className="mt-1.5">
                            <span className="flex items-center gap-1.5">
                                <Globe className="h-3.5 w-3.5" />
                                {site.domain}
                            </span>
                        </CardDescription>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        <div>Created {formatDistanceToNow(createdAt, { addSuffix: true })}</div>
                        <div>Updated {formatDistanceToNow(updatedAt, { addSuffix: true })}</div>
                    </div>
                </div>
            </CardHeader>
            <Tabs defaultValue="preview" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger
                        value="preview"
                        className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                        <Globe className="mr-2 h-4 w-4" />
                        Preview
                    </TabsTrigger>
                    <TabsTrigger
                        value="edit"
                        className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit
                    </TabsTrigger>
                    <TabsTrigger
                        value="analytics"
                        className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger
                        value="settings"
                        className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="p-0">
                    <SitePreview site={site} />
                </TabsContent>
                <TabsContent value="edit" className="p-6">
                    <UpdateSiteForm site={site} />
                </TabsContent>
                <TabsContent value="analytics" className="p-6">
                    <SiteAnalytics site={site} />
                </TabsContent>
                <TabsContent value="settings" className="p-6">
                    <SiteSettings site={site} />
                </TabsContent>
            </Tabs>
        </Card>
    )
}
