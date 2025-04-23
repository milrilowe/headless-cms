import { db } from "@/lib/db";

export async function userHasPermissionForSite(userId: number, siteId: number, requiredRoles: string[]) {
    const membership = await db.workspaceMember.findFirst({
        where: {
            userId,
            workspace: {
                sites: {
                    some: {
                        id: siteId
                    }
                }
            },
            role: {
                in: requiredRoles
            }
        }
    });

    return !!membership;
}