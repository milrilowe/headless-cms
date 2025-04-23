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
                throw new Error('Invalid credentials');
            }

            // Create session FIRST, before returning any data
            const session = await useAppSession()

            await session.update({
                user
            })

            return user;

        } catch (error) {
            console.error('Login error:', error);

            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    })