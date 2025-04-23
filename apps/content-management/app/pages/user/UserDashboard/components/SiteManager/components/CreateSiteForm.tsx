import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { createSite } from "@/lib/actions/sites"
import { type CreateSiteFormInput, createSiteFormSchema, type CreateSitePayload } from "@/lib/schemas/sites"
import type { IUser } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { Loader2, Globe, Server, Database } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface CreateSiteFormProps {
    user: IUser
    onSuccess?: () => void
}

export function CreateSiteForm({ user, onSuccess }: CreateSiteFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<CreateSiteFormInput>({
        resolver: zodResolver(createSiteFormSchema),
        defaultValues: {
            name: "",
            domain: "",
            storageRegion: "us-east-1",
        },
    })

    async function onSubmit(data: CreateSiteFormInput) {
        startTransition(async () => {
            try {
                // Add userId to the form data to create the payload
                const payload: CreateSitePayload = {
                    ...data,
                    userId: user.id,
                }

                const result = await createSite({ data: payload })
                toast.success("Site created successfully!")
                await router.invalidate({ sync: true })
                onSuccess?.()
            } catch (error) {
                toast.error(`Failed to create site: ${error instanceof Error ? error.message : "Unknown error"}`)
            }
        })
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1.5">
                                                <Database className="h-4 w-4" />
                                                Site Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="My Awesome Site" {...field} />
                                            </FormControl>
                                            <FormDescription>A descriptive name for your site</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="domain"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1.5">
                                                <Globe className="h-4 w-4" />
                                                Domain
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="mysite.com" {...field} />
                                            </FormControl>
                                            <FormDescription>The domain where your site will be accessible</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="storageRegion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1.5">
                                                <Server className="h-4 w-4" />
                                                Storage Region
                                            </FormLabel>
                                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select region" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="us-east-1">us-east-1 (N. Virginia)</SelectItem>
                                                    <SelectItem value="us-east-2">us-east-2 (Ohio)</SelectItem>
                                                    <SelectItem value="us-west-1">us-west-1 (N. California)</SelectItem>
                                                    <SelectItem value="us-west-2">us-west-2 (Oregon)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Choose the region closest to your target audience</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="bg-muted/50 rounded-lg p-6 flex flex-col">
                                <h3 className="font-medium mb-2">Site Preview</h3>
                                <div className="text-sm text-muted-foreground mb-4">
                                    Your site will be created with the following configuration:
                                </div>

                                <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background rounded-md border border-dashed">
                                    <div className="w-full max-w-xs space-y-4">
                                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                                        <div className="h-4 w-full bg-muted rounded"></div>
                                        <div className="h-4 w-5/6 bg-muted rounded"></div>
                                        <div className="h-20 w-full bg-muted rounded"></div>
                                    </div>
                                </div>

                                <div className="mt-4 text-sm">
                                    <div className="flex justify-between py-1 border-b">
                                        <span className="text-muted-foreground">Name:</span>
                                        <span className="font-medium">{form.watch("name") || "My Awesome Site"}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b">
                                        <span className="text-muted-foreground">Domain:</span>
                                        <span className="font-medium">{form.watch("domain") || "mysite.com"}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-muted-foreground">Region:</span>
                                        <span className="font-medium">{form.watch("storageRegion") || "us-east-1"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Create Site
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
