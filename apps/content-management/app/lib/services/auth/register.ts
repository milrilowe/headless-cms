import { hashSync } from 'bcryptjs'
import { db } from '@/lib/db'
import type { RegisterInput } from '@/lib/schemas/auth'

export async function register({ email, password, name }: RegisterInput) {
    // Hash password
    const hashedPassword = hashSync(password, 10);

    // Create new user
    const user = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}