import { requireIsAdminMiddleware } from "@/lib/middleware";
import { userService } from "@/lib/services/users";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const getUserByIdSchema = z.object({
    userId: z.number()
});

export const getUserById = createServerFn({ method: 'GET' })
    .validator(zodValidator(getUserByIdSchema))
    .middleware([requireIsAdminMiddleware])
    .handler(async ({ data }) => {
        try {
            return await userService.getUserById(data.userId);

        } catch (error) {
            console.error('Error getting user by ID:', error)
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    });