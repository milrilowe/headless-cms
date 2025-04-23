import { ISession, IUser } from "@/types";

export function isAuthenticated(user: IUser): boolean {
    return !!user;
}

export function isAdmin(user: IUser): boolean {
    return user.systemRole === 'admin' || user.systemRole === 'superadmin';
}

export function isSuperAdmin(user: IUser): boolean {
    return user.systemRole === 'superadmin';
}