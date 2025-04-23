import { db } from "@/lib/db";

export async function getSitesByWorkspaceId(workspaceId: number) {
    return db.site.findMany({
        where: { workspaceId },
        orderBy: { createdAt: 'desc' }
    });
}