import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "@/lib/auth/session";
import { createSiteSchema } from "@/lib/schemas/sites";
import { createSite as createSiteService } from "@/lib/services/sites";
import { zodValidator } from "@tanstack/zod-adapter";
import { requireisAuthenticatedMiddleware } from "@/lib/middleware";

export const createSite = createServerFn({ method: 'POST' })
    .validator(zodValidator(createSiteSchema))
    .middleware([requireisAuthenticatedMiddleware])
    .handler(async ({ data }) => {
        try {
            return await createSiteService(data);

        } catch (error) {
            console.error('Error creating site:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });