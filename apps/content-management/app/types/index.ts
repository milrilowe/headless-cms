import type { User } from '@prisma/client'

// Session user with only essential info
export type SessionUser = {
    id: User['id']
    email: User['email']
    name?: User['name']
    role: User['role']
}

export type User = Omit<User, 'password' | 'createdAt' | 'updatedAt'>