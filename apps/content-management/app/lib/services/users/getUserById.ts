import { db } from "@/lib/db";

export async function getUserById(id: number) {
    return db.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            systemRole: true,
            createdAt: true,
            updatedAt: true
        }
    });
}