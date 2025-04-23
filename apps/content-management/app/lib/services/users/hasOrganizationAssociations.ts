import { db } from "@/lib/db";

export async function hasOrganizationAssociations(userId: number) {
    const memberCount = await db.organizationMember.count({
        where: { userId }
    });

    return memberCount > 0;
}