import { useAppSession } from "@/lib/auth/session";
import { authService } from "@/lib/services/auth";
import { createServerFn } from "@tanstack/react-start";

export const getCurrentUser = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const sessionData = (await useAppSession()).data

            if (!sessionData || !sessionData.id) {
                return await authService.getUserById(sessionData.id);
            }

            return sessionData;

        } catch (error) {
            console.error('Get current user error:', error);

            return null
        }
    })