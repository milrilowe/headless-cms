import { useAppSession } from "@/lib/auth/session";
import { authService } from "@/lib/services/auth";
import { createServerFn } from "@tanstack/react-start";

export const getCurrentUser = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const session = await useAppSession()
            const data = session.data;

            if (!data || !data.userId) {
                return null
            }

            return await authService.getUserById(data.userId);

        } catch (error) {
            console.error('Get current user error:', error);

            return null
        }
    })