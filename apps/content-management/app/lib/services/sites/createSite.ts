import { db } from "@/lib/db";
import { CreateSitePayload } from "@/lib/schemas/sites";

export async function createSite(data: CreateSitePayload) {
    const { workspaceId, ...siteData } = data;
    return db.site.create({
        data: {
            ...siteData,
            workspace: {
                connect: { id: workspaceId }
            }
        }
    });
}