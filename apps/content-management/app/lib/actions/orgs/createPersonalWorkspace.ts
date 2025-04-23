import { createServerFn } from "@tanstack/react-start";
import { requireisAuthenticatedMiddleware } from "@/lib/middleware";
import { zodValidator } from "@tanstack/zod-adapter";
import { workspaceFormSchema } from "@/lib/schemas/orgs";
import { workspaceService } from "@/lib/services/workspaces";
import { useAppSession } from "@/lib/auth/session";

export const createPersonalWorkspace = createServerFn({ method: 'POST' })
    .validator(zodValidator(workspaceFormSchema))
    .middleware([requireisAuthenticatedMiddleware])
    .handler(async ({ context, data }) => {
        try {
            const session = await useAppSession();
            const user = context.session.user;
            const { name, slug } = data;

            // Check if user already has a personal workspace
            if (user.personalWorkspaceId) {
                throw new Error('User already has a personal workspace');
            }

            // Use the service to check slug availability
            const isSlugAvailable = await workspaceService.checkSlugAvailability(slug);
            if (!isSlugAvailable) {
                throw new Error('This URL is already taken');
            }

            // Use the service to create the personal workspace
            const result = await workspaceService.createPersonalWorkspace(user.id, name, slug);

            await session.update({
                user: result.user
            });

            return { workspace: result.workspace, user: result.user };
        } catch (error) {
            console.error('Create personal workspace error:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    });