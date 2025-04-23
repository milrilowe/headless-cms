import { db } from "@/lib/db";
import { UpdateSitePayload } from "@/lib/schemas/sites";

export async function updateSite(id: number, data: UpdateSitePayload) {
    return db.site.update({
        where: { id },
        data
    });
}