import { createMiddleware } from "@tanstack/react-start";
import { useAppSession } from "@/lib/auth/session";
import { isAdmin, isAuthenticated, isSuperAdmin } from "@/lib/auth/permissions";

export const requireisAuthenticatedMiddleware = createMiddleware().server(async ({ next, context }) => {
    const sessionData = (await useAppSession()).data;

    if (!isAuthenticated(sessionData)) {
        throw new Error('Unauthorized');
    }

    return next({ context: { session: sessionData } });
});

export const requireIsAdminMiddleware = createMiddleware()
    .middleware([requireisAuthenticatedMiddleware])
    .server(async ({ next, context }) => {
        if (!isAdmin(context.session)) {
            throw new Error('Permission denied');
        }

        return next();
    });

export const requireIsSuperAdminMiddleware = createMiddleware()
    .middleware([requireisAuthenticatedMiddleware])
    .server(async ({ next, context }) => {
        if (!isSuperAdmin(context.session)) {
            throw new Error('Permission denied');
        }

        return next();
    });