import { db } from "@/lib/db";

export async function getMyWorkspaces(userId: number) {
    return db.workspace.findMany({
        where: {
            members: {
                some: {
                    userId
                }
            }
        },
        include: {
            _count: {
                select: {
                    sites: true,
                    members: true
                }
            }
        },
        orderBy: [
            {
                type: 'desc'
            },
            {
                createdAt: 'desc'
            }
        ]
    });
}