import { db } from "@/lib/db";

export async function hasWorkspaceAssociations(userId: number) {
    const memberCount = await db.workspaceMember.count({
        where: { userId }
    });

    return memberCount > 0;
}