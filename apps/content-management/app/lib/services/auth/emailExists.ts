import { db } from "@/lib/db"

export async function emailExists(email: string) {
    const user = await db.user.findUnique({
        where: { email },
        select: { id: true }
    })

    return user !== null
}