import type { ISite } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SitePreviewProps {
    site: ISite
}

export function SitePreview({ site }: SitePreviewProps) {

    return (
        <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Site Preview</h3>
                <Button variant="outline" size="sm" asChild>
                    <a href={site.domain} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                        <ExternalLink className="h-4 w-4" />
                        Visit Site
                    </a>
                </Button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-background">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Globe className="h-12 w-12 opacity-20" />
                        <span className="text-sm">Preview of {site.domain}</span>
                    </div>
                </div>
                <iframe
                    src={site.domain}
                    className="absolute inset-0 h-full w-full opacity-10 hover:opacity-100 transition-opacity duration-300"
                    title={`Preview of ${site.name}`}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="text-3xl font-bold">0</div>
                        <div className="text-sm text-muted-foreground">Daily Visitors</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="text-3xl font-bold">0 ms</div>
                        <div className="text-sm text-muted-foreground">Avg. Load Time</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="text-3xl font-bold">100%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
