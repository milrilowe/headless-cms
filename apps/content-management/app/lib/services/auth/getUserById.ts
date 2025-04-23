import { db } from "@/lib/db"

export async function getUserById(id: number) {
    if (!id) {
        return null
    }

    const user = await db.user.findUnique({
        where: { id }
    })

    if (!user) {
        return null
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}