import { ISession } from "@/types";

export function isAuthenticated(session: ISession | null): boolean {
    return !!session && !!session.user.id;
}

export function isAdmin(session: ISession): boolean {
    return session.user.systemRole === 'admin' || session.user.systemRole === 'superadmin';
}

export function isSuperAdmin(session: ISession): boolean {
    return session.user.systemRole === 'superadmin';
}