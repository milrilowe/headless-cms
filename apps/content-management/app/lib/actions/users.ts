import { createServerFn } from '@tanstack/react-start'
import { useAppSession } from '@/lib/auth/session'
import { userService } from '@/lib/services/users'
import { z } from 'zod'

export const getUserList = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            // Get the current user's session to check permissions
            const session = (await useAppSession()).data

            if (!session || !session.userId) {
                throw new Error('Unauthorized');
            }

            if (session.role !== 'admin') {
                throw new Error('Permission denied');
            }

            // Get the list of users
            const users = await userService.getAllUsers();

            return users;

        } catch (error) {
            console.error('Error getting user list:', error)
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    })

export const deleteUser = createServerFn({ method: 'POST' })
    .validator((data: unknown) => {
        return z.object({
            userId: z.number()
        }).parse(data)
    })
    .handler(async ({ data }) => {
        try {
            // Get the current user's session to check permissions
            const session = (await useAppSession()).data

            if (!session || !session.userId) {
                throw new Error('Unauthorized');
            }

            if (session.role !== 'admin') {
                throw new Error('Permission denied');
            }

            // Prevent admin from deleting themselves
            if (data.userId === session.userId) {
                throw new Error('Admin cannot delete themselves');
            }

            // Check if the user has any sites
            const userHasSites = await userService.hasAssociatedSites(data.userId)
            if (userHasSites) {
                throw new Error('User has associated sites and cannot be deleted');

            }

            // Delete the user
            await userService.deleteUser(data.userId)

            return {
                success: true
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            throw new Error(
                error instanceof Error ? error.message : 'An unexpected error occurred'
            )
        }
    })