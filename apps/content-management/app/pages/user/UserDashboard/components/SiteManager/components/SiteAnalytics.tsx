import type { ISite } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart } from "lucide-react"

interface SiteAnalyticsProps {
    site: ISite
}

export function SiteAnalytics({ site }: SiteAnalyticsProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Site Analytics</h3>
                <p className="text-sm text-muted-foreground mb-6">Track your site's performance and visitor statistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Visitors</CardTitle>
                        <CardDescription>Daily unique visitors</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                                <BarChart className="h-10 w-10 opacity-20" />
                                <span className="text-sm">No data available yet</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Performance</CardTitle>
                        <CardDescription>Page load times</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                                <LineChart className="h-10 w-10 opacity-20" />
                                <span className="text-sm">No data available yet</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-medium">Top Pages</CardTitle>
                    <CardDescription>Most visited pages on your site</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
                        No page visit data available yet
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
