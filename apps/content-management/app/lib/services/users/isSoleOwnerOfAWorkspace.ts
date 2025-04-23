import { db } from "@/lib/db";

export async function isSoleOwnerOfAWorkspace(userId: number) {
    // Find workspaces where this user is the only owner
    const orgsWithSoleOwner = await db.workspace.findMany({
        where: {
            members: {
                some: {
                    userId,
                    role: 'owner'
                }
            }
        },
        include: {
            members: {
                where: {
                    role: 'owner'
                },
                select: {
                    userId: true
                }
            }
        }
    });

    // Check if any of these workspaces have only this user as owner
    return orgsWithSoleOwner.some(org =>
        org.members.length === 1 && org.members[0].userId === userId
    );
}