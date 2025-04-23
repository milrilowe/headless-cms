import { db } from "@/lib/db";

export async function getSiteById(id: number) {
    return db.site.findUnique({
        where: { id },
        include: {
            workspace: {
                select: {
                    id: true,
                    name: true,
                    slug: true
                }
            }
        }
    });
}