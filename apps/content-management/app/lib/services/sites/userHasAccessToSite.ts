import { db } from "@/lib/db";

export async function userHasAccessToSite(userId: number, siteId: number) {
    const site = await db.site.findFirst({
        where: {
            id: siteId,
            workspace: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        }
    });

    return !!site;
}