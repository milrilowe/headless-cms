import { db } from "@/lib/db";
import { CreateSitePayload } from "@/lib/schemas/sites";

export async function createSite(data: CreateSitePayload) {
    const { organizationId, ...siteData } = data;
    return db.site.create({
        data: {
            ...siteData,
            organization: {
                connect: { id: organizationId }
            }
        }
    });
}