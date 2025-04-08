import { useAppSession } from "@/lib/auth/session";
import { createServerFn } from "@tanstack/react-start";

export const logout = createServerFn({ method: 'POST' })
    .handler(async () => {
        try {
            const session = await useAppSession();
            await session.clear();

            return {
                success: true
            }

        } catch (error) {
            console.error('Logout error:', error);

            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    })