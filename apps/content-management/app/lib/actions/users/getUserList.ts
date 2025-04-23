
import { createServerFn } from "@tanstack/react-start";
import { getAllUsers } from "@/lib/services/users";
import { requireIsAdminMiddleware } from "@/lib/middleware";

export const getUserList = createServerFn({ method: 'GET' })
    .middleware([requireIsAdminMiddleware])
    .handler(async () => {
        try {
            return await getAllUsers();

        } catch (error) {
            console.error('Error getting user list:', error)
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    })

