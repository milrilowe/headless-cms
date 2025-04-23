// app/lib/actions/orgs/createPersonalOrganization.ts
import { createServerFn } from "@tanstack/react-start";
import { requireisAuthenticatedMiddleware } from "@/lib/middleware";
import { zodValidator } from "@tanstack/zod-adapter";
import { workspaceFormSchema } from "@/lib/schemas/orgs";
import { checkSlugAvailability, createPersonalOrganization } from "@/lib/services/orgs";
import { useAppSession } from "@/lib/auth/session";

export const createPersonalWorkspace = createServerFn({ method: 'POST' })
    .validator(zodValidator(workspaceFormSchema))
    .middleware([requireisAuthenticatedMiddleware])
    .handler(async ({ context, data }) => {
        try {
            const session = await useAppSession();
            const user = context.session.user;
            const { name, slug } = data;

            // Check if user already has a personal organization
            if (user.personalOrganizationId) {
                throw new Error('User already has a personal organization');
            }

            // Use the service to check slug availability
            const isSlugAvailable = await checkSlugAvailability(slug);
            if (!isSlugAvailable) {
                throw new Error('This URL is already taken');
            }

            // Use the service to create the personal organization
            const result = await createPersonalOrganization(user.id, name, slug);

            await session.update({
                user: result.user
            });

            return { organization: result.organization, user: result.user };
        } catch (error) {
            console.error('Create personal organization error:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });