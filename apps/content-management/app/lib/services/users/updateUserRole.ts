import { db } from "@/lib/db";

export async function updateUserRole(userId: number, systemRole: string) {
    return db.user.update({
        where: { id: userId },
        data: { systemRole }
    });
}