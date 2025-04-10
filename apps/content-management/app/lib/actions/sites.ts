import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "@/lib/auth/session";
import { siteService } from "@/lib/services/sites";

export const getMySites = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const sessionData = (await useAppSession()).data;

            if (!sessionData || !sessionData) {
                throw new Error('Unauthorized');
            }

            const sites = await siteService.getSitesByUserId(sessionData.id);
            return sites;

        } catch (error) {
            console.error('Error getting site list:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });
