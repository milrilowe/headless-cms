import { db } from "@/lib/db";

export async function getAllUsers() {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            systemRole: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}