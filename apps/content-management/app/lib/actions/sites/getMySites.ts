import { useAppSession } from "@/lib/auth/session";
import { requireisAuthenticatedMiddleware } from "@/lib/middleware";
import { getSitesForUser } from "@/lib/services/sites";
import { createServerFn } from "@tanstack/react-start";

export const getMySites = createServerFn({ method: 'GET' })
    .middleware([requireisAuthenticatedMiddleware])
    .handler(async ({ context }) => {
        try {
            return await getSitesForUser(context.user.id);

        } catch (error) {
            console.error('Error getting site list:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });