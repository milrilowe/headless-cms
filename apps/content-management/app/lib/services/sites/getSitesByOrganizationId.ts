import { db } from "@/lib/db";

export async function getSitesByOrganizationId(organizationId: number) {
    return db.site.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' }
    });
}