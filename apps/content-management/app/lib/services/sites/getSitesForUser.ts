import { db } from "@/lib/db";

export async function getSitesForUser(userId: number) {
    return db.site.findMany({
        where: {
            organization: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        },
        include: {
            organization: {
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