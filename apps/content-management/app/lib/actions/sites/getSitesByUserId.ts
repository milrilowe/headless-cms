import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { useAppSession } from "@/lib/auth/session";
import { getSitesForUser } from "@/lib/services/sites";
import { zodValidator } from "@tanstack/zod-adapter";
import { requireIsAdminMiddleware } from "@/lib/middleware";

const getSitesByUserIdSchema = z.object({
    userId: z.number(),
});

export const getSitesByUserId = createServerFn({ method: 'GET' })
    .validator(zodValidator(getSitesByUserIdSchema))
    .middleware([requireIsAdminMiddleware])
    .handler(async ({ data }) => {
        try {
            return await getSitesForUser(data.userId);

        } catch (error) {
            console.error('Error getting site list:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });