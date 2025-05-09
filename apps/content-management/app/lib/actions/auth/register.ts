import { useAppSession } from "@/lib/auth/session";
import { registerSchema } from "@/lib/schemas/auth";
import { authService } from "@/lib/services/auth";
import { createServerFn } from "@tanstack/react-start";

export const register = createServerFn({ method: 'POST' })
    .validator((data: unknown) => {
        return registerSchema.parse(data);
    })
    .handler(async ({ data }) => {
        try {
            const emailExists = await authService.emailExists(data.email);

            if (emailExists) {
                return {
                    success: false,
                    message: 'Email already in use'
                }
            }

            const user = await authService.register(data);

            if (!user) {
                return {
                    success: false,
                    message: 'Failed to create account'
                }
            }

            // Create session
            const session = await useAppSession();

            await session.update({
                user
            });

            return {
                success: true,
                user
            }

        } catch (error) {
            console.error('Registration error:', error);

            return {
                success: false,
                message: error instanceof Error ? error.message : 'An unexpected error occurred'
            }
        }
    })