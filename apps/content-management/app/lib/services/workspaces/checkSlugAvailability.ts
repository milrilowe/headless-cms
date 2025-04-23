import { db } from "@/lib/db";

export async function checkSlugAvailability(slug: string): Promise<boolean> {
    const exists = await db.workspace.findUnique({
        where: { slug },
        select: { id: true }
    });

    return !exists;
}