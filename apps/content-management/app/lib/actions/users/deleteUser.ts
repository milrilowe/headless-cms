import { requireIsAdminMiddleware } from "@/lib/middleware";
import { userService } from "@/lib/services/users";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const deleteUserSchema = z.object({
    userId: z.number()
})

export const deleteUser = createServerFn({ method: 'POST' })
    .validator(zodValidator(deleteUserSchema))
    .middleware([requireIsAdminMiddleware])
    .handler(async ({ data, context }) => {
        if (data.userId === context.session.user.id) {
            throw new Error('Admin cannot delete themselves');
        }

        try {

            return await userService.deleteUser(data.userId)

        } catch (error) {
            console.error('Error deleting user:', error)
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    });