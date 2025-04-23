import { db } from "@/lib/db";

export async function createPersonalWorkspace(userId: number, name: string, slug: string) {
    return db.$transaction(async (prisma) => {
        // Create the personal workspace
        const workspace = await prisma.workspace.create({
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

        // Update user with personal workspace ID
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                personalWorkspaceId: workspace.id
            }
        });

        return { workspace, user };
    });
}