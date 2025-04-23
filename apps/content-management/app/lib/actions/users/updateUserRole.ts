import { requireIsSuperAdminMiddleware } from "@/lib/middleware";
import { updateUserRoleSchema } from "@/lib/schemas/users";
import { userService } from "@/lib/services/users";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const updateUserRole = createServerFn({ method: 'POST' })
    .validator(zodValidator(updateUserRoleSchema))
    .middleware([requireIsSuperAdminMiddleware])
    .handler(async ({ context, data }) => {
        if (context.session.user.id === data.userId) {
            throw new Error('You cannot update your own role');
        }

        try {
            return await userService.updateUserRole(data.userId, data.role);

        } catch (error) {
            console.error('Error updating user role:', error);
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    })