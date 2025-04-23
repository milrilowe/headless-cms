import { ISessionUser } from "@/types";

export function isAuthenticated(sessionData: ISessionUser | null): boolean {
    return !!sessionData && !!sessionData.id;
}

export function isAdmin(user: ISessionUser): boolean {
    return user.role === 'admin' || user.role === 'superadmin';
}

export function isSuperAdmin(user: ISessionUser): boolean {
    return user.role === 'superadmin';
}