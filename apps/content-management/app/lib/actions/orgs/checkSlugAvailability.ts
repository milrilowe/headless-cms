import { createServerFn } from "@tanstack/react-start";
import { checkSlugAvailability } from "@/lib/services/workspaces";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const checkSlugAvailabilitySchema = z.object({
    slug: z.string().min(1, "Slug is required")
});

export const checkSlugIsAvailable = createServerFn({ method: 'GET' })
    .validator(zodValidator(checkSlugAvailabilitySchema))
    .handler(async ({ data }) => {
        try {
            const { slug } = data;

            if (!slug) {
                throw new Error('Slug is required');
            }

            const available = await checkSlugAvailability(slug);

            return {
                success: true,
                available
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });