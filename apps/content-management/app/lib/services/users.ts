import { db } from '@/lib/db'

export const userService = {
    // Get all users
    async getAllUsers() {
        return db.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    },

    // Get user by ID
    async getUserById(id: number) {
        return db.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
    },

    // Update user role
    async updateUserRole(userId: number, role: string) {
        return db.user.update({
            where: { id: userId },
            data: { role }
        });
    },

    // Delete user
    async deleteUser(userId: number) {
        return db.user.delete({
            where: { id: userId }
        });
    },

    // Check if user has sites
    async hasAssociatedSites(userId: number) {
        const count = await db.site.count({
            where: { userId }
        });
        return count > 0;
    },
}