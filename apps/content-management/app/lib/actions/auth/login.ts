import { useAppSession } from "@/lib/auth/session"
import { loginSchema } from "@/lib/schemas/auth"
import { authService } from "@/lib/services/auth"
import { createServerFn } from "@tanstack/react-start"

export const login = createServerFn({ method: 'POST' })
    .validator((data: unknown) => {
        return loginSchema.parse(data)
    })
    .handler(async ({ data }) => {

        try {
            // Use service to handle login logic
            const user = await authService.login(data)

            if (!user) {
                return {
                    success: false,
                    message: 'Invalid email or password'
                }
            }

            // Create session FIRST, before returning any data
            const session = await useAppSession()


            await session.update({
                id: user.id,
                email: user.email,
                role: user.role || 'user',
            })

            return {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        } catch (error) {
            console.error('Login error:', error)
            return {
                success: false,
                message: error instanceof Error ? error.message : 'An unexpected error occurred'
            }
        }
    })