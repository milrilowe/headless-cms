import { db } from "@/lib/db";

export async function deleteUser(userId: number) {
    return db.user.delete({
        where: { id: userId }
    });
}