import { compareSync } from 'bcryptjs'
import { db } from '@/lib/db'
import type { LoginInput } from '@/lib/schemas/auth'

export async function login({ email, password }: LoginInput) {
    const user = await db.user.findUnique({
        where: { email }
    })

    if (!user) {
        return null
    }

    const isValidPassword = compareSync(password, user.password)

    if (!isValidPassword) {
        return null
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}