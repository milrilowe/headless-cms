// app/lib/services/orgs/createPersonalOrganization.ts
import { db } from "@/lib/db";

export async function createPersonalOrganization(userId: number, name: string, slug: string) {
    return db.$transaction(async (prisma) => {
        // Create the personal organization
        const organization = await prisma.organization.create({
            data: {
                name,
                slug,
                type: "personal",
                members: {
                    create: {
                        userId,
                        role: "owner"
                    }
                }
            }
        });

        // Update user with personal organization ID
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                personalOrganizationId: organization.id
            }
        });

        return { organization, user };
    });
}