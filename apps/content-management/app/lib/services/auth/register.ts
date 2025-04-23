import { hashSync } from 'bcryptjs'
import { db } from '@/lib/db'
import type { RegisterInput } from '@/lib/schemas/auth'

export async function register({ email, password, name }: RegisterInput) {
    const hashedPassword = hashSync(password, 10);

    const user = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}