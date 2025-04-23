import { db } from "@/lib/db";

export async function deleteSite(id: number) {
    return db.site.delete({
        where: { id }
    });
}