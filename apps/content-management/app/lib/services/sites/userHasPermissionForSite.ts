import { db } from "@/lib/db";

export async function userHasPermissionForSite(userId: number, siteId: number, requiredRoles: string[]) {
    const membership = await db.organizationMember.findFirst({
        where: {
            userId,
            organization: {
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