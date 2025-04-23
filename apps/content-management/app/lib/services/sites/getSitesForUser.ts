import { db } from "@/lib/db";

export async function getSitesForUser(userId: number) {
    return db.site.findMany({
        where: {
            workspace: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        },
        include: {
            workspace: {
                select: {
                    id: true,
                    name: true,
                    slug: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
}