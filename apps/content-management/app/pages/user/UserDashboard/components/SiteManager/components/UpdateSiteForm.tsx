import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateSite } from "@/lib/actions/sites"
import { createSiteFormSchema, type UpdateSiteFormInput, type UpdateSitePayload } from "@/lib/schemas/sites"
import type { ISite } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { Loader2, Globe, Server, Database, CheckCircle } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface UpdateSiteFormProps {
    site: ISite
}

export function UpdateSiteForm({ site }: UpdateSiteFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()
    const [isSuccess, setIsSuccess] = React.useState(false)

    const form = useForm<UpdateSiteFormInput>({
        resolver: zodResolver(createSiteFormSchema),
        defaultValues: {
            name: site.name,
            domain: site.domain,
            storageRegion: site.storageRegion,
        },
    })

    async function onSubmit(data: UpdateSiteFormInput) {
        startTransition(async () => {
            try {
                const payload: UpdateSitePayload = {
                    ...data,
                    id: site.id,
                }

                const result = await updateSite({ data: payload })
                toast.success("Site updated successfully!")
                setIsSuccess(true)
                setTimeout(() => setIsSuccess(false), 2000)
                await router.invalidate({ sync: true })
            } catch (error) {
                toast.error(`Failed to update site: ${error instanceof Error ? error.message : "Unknown error"}`)
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

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

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending || isSuccess}
                            className={`w-full sm:w-auto transition-all ${isSuccess ? "bg-green-600 hover:bg-green-600" : ""}`}
                        >
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : isSuccess ? (
                                <CheckCircle className="mr-2 h-4 w-4" />
                            ) : null}
                            {isSuccess ? "Updated!" : "Update Site"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
