// app/pages/dashboard/Dashboard.tsx
import { IUser } from "@/types"
import { UserDashboard } from "../user"
import { Button } from "@/components/ui/button"
import { useRouter } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { createPersonalWorkspace, checkSlugIsAvailable } from "@/lib/actions/orgs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Globe, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { slugify } from "@/lib/utils"
import { workspaceFormSchema } from "@/lib/schemas/orgs"

interface Props {
    user: IUser;
    isAdmin: boolean;
}

type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;

export function Dashboard({ user, isAdmin }: Props) {
    const router = useRouter();
    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
    const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
    const [isCheckingSlug, setIsCheckingSlug] = useState(false);

    // Check if user has a personal workspace
    const hasPersonalWorkspace = !!user.personalWorkspaceId;

    // Set up form with default values
    const form = useForm<WorkspaceFormValues>({
        resolver: zodResolver(workspaceFormSchema),
        defaultValues: {
            name: `${user.name || 'My'}'s Workspace`,
            slug: slugify(user.name || 'my-workspace')
        }
    });

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Replace spaces and other invalid characters
        const rawValue = e.target.value;
        const formattedSlug = rawValue.toLowerCase()
            .replace(/\s+/g, '-')       // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '') // Remove any character that's not a letter, number, or hyphen

        form.setValue("slug", formattedSlug);
    };

    const watchedSlug = form.watch("slug");

    // Check slug availability when it changes
    useEffect(() => {
        const checkSlug = async () => {
            if (!watchedSlug || watchedSlug.length < 3) {
                setSlugAvailable(null);
                return;
            }

            setIsCheckingSlug(true);
            try {
                const result = await checkSlugIsAvailable({ data: { slug: watchedSlug } });
                setSlugAvailable(result.available);
            } catch (error) {
                console.error("Error checking slug:", error);
                setSlugAvailable(null);
            } finally {
                setIsCheckingSlug(false);
            }
        };

        const timeoutId = setTimeout(checkSlug, 500); // Debounce
        return () => clearTimeout(timeoutId);
    }, [watchedSlug]);

    // Handle name change to update slug automatically
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        form.setValue("name", name);
        form.setValue("slug", slugify(name));
    };

    // Function to create personal workspace
    const onSubmit = async (values: WorkspaceFormValues) => {
        setIsCreatingWorkspace(true);
        try {
            await createPersonalWorkspace({ data: values });
            toast.success("Personal workspace created successfully!");
            await router.invalidate({ sync: true });
        } catch (error) {
            toast.error(`Failed to create workspace: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setIsCreatingWorkspace(false);
        }
    };

    if (!hasPersonalWorkspace) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <Card className="border-2 border-primary/10">
                    <CardHeader>
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Globe className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Welcome to SiteManager!</CardTitle>
                        <CardDescription className="text-center text-base">
                            Let's set up your personal workspace to get started.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center text-muted-foreground mb-4">
                            <p>
                                Your personal workspace is where you'll manage all your sites.
                                This allows you to organize your content and collaborate with team members.
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Workspace Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={handleNameChange}
                                                    placeholder="My Awesome Workspace"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                What would you like to call your workspace?
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Workspace URL</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <div className="bg-muted px-3 py-2 text-sm rounded-l-md border-y border-l border-input text-muted-foreground">
                                                        sitemanager.com/
                                                    </div>
                                                    <Input
                                                        {...field}
                                                        onChange={handleSlugChange}
                                                        className="rounded-l-none"
                                                        placeholder="my-workspace"
                                                    />
                                                    <div className="ml-2">
                                                        {isCheckingSlug ? (
                                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                        ) : slugAvailable === true ? (
                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                        ) : slugAvailable === false ? (
                                                            <XCircle className="h-5 w-5 text-red-500" />
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                {slugAvailable === false ? (
                                                    <span className="text-red-500">This URL is already taken. Please try another.</span>
                                                ) : (
                                                    "This will be the URL for your workspace. Only lowercase letters, numbers, and hyphens are allowed."
                                                )}
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-center pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isCreatingWorkspace || slugAvailable === false}
                                        className="w-full max-w-xs"
                                        size="lg"
                                    >
                                        {isCreatingWorkspace ? 'Creating...' : 'Create Personal Workspace'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <UserDashboard user={user} sites={[]} />
        </>
    )
}