import { useAppSession } from "@/lib/auth/session";
import { requireisAuthenticatedMiddleware } from "@/lib/middleware";
import { authService } from "@/lib/services/auth";
import { createServerFn } from "@tanstack/react-start";

export const getSession = createServerFn({ method: 'GET' })
    .middleware([requireisAuthenticatedMiddleware])
    .handler(async ({ context }) => {
        try {
            return context.session;

        } catch (error) {
            console.error('Get current user error:', error);

            return null
        }
    })