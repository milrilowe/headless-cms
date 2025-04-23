import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "@/lib/auth/session";
import { updateSiteSchema } from "@/lib/schemas/sites";
import { updateSite as updateSiteService } from "@/lib/services/sites";
import { zodValidator } from "@tanstack/zod-adapter";
import { requireisAuthenticatedMiddleware } from "@/lib/middleware";

export const updateSite = createServerFn({ method: 'POST' })
    .validator(zodValidator(updateSiteSchema))
    .middleware([requireisAuthenticatedMiddleware])
    .handler(async ({ data, context }) => {
        try {
            return await updateSiteService(context.session.user.id, data);

        } catch (error) {
            console.error('Error updating site:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });