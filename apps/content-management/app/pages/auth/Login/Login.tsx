import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Loader2, Lock, Mail } from 'lucide-react'
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
import { login } from '@/lib/actions/auth'
import { loginSchema, LoginInput } from '@/lib/schemas/auth'

export default function Login() {
    const navigate = useNavigate()
    const [isPending, startTransition] = React.useTransition()

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(data: LoginInput) {
        startTransition(async () => {
            try {
                const result = await login({ data })

                if (!result.success) {
                    toast.error(result.message)
                    return
                }

                toast.success('Login successful!')
                navigate({ to: '/' })
            } catch (error) {
                toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <h1 className="text-center text-2xl font-medium text-blue-600 mb-8">Sign In</h1>

                <div className="bg-white rounded-md shadow-sm border border-gray-100">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
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
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-gray-700 text-sm">Password</FormLabel>
                                            <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
                                                Forgot password?
                                            </a>
                                        </div>
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

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-10 mt-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}