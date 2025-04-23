// apps/content-management/app/pages/auth/Registration/Registration.tsx
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, KeyRound, User, Building } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { register } from '@/lib/actions/auth'
import { registerSchema, RegisterInput } from '@/lib/schemas/auth'

export function Registration() {
    const navigate = useNavigate()
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            workspaceName: ''
        }
    })

    async function onSubmit(data: RegisterInput) {
        startTransition(async () => {
            try {
                const result = await register({ data })

                if (!result.success) {
                    toast.error(result.message)
                    return
                }

                toast.success('Registration successful!')
                navigate({ to: '/' })
            } catch (error) {
                toast.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <h1 className="text-center text-2xl font-medium text-blue-600 mb-8">Create Account</h1>

                <div className="bg-white rounded-md shadow-sm border border-gray-100">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 text-sm">Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                                                <Input
                                                    className="border-gray-200 pl-10 h-10 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 text-sm">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                                                <Input
                                                    type="email"
                                                    className="border-gray-200 pl-10 h-10 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                                    placeholder="email@example.com"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 text-sm">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                                                <Input
                                                    type="password"
                                                    className="border-gray-200 pl-10 h-10 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                                    placeholder="••••••••"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="workspaceName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 text-sm">Workspace Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                                                <Input
                                                    className="border-gray-200 pl-10 h-10 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                                    placeholder="Your Company"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-10 mt-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{" "}
                                <a href="/login" className="text-blue-600 hover:text-blue-800">
                                    Sign in
                                </a>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}