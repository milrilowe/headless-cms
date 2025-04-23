import { getSessionMiddleware } from "@/lib/middleware";
import { createServerFn, ServerFnResponseType } from "@tanstack/react-start";

type ServerResponse<T = null> = ServerFnResponseType

export const getSession = createServerFn({ method: 'GET' })
    .middleware([getSessionMiddleware])
    .handler(async ({ context }) => {
        try {
            return context.session;

        } catch (error) {
            console.error('Get current user error:', error);

            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            );
        }
    })
