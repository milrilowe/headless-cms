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
                return {
                    success: false,
                    message: 'Unauthorized'
                }
            }

            if (session.role !== 'admin') {
                return {
                    success: false,
                    message: 'Permission denied'
                }
            }

            // Get the list of users
            const users = await userService.getAllUsers();

            return {
                success: true,
                users
            }
        } catch (error) {
            console.error('Error getting user list:', error)
            return {
                success: false,
                message: error instanceof Error ? error.message : 'An unexpected error occurred'
            }
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
                return {
                    success: false,
                    message: 'Unauthorized'
                }
            }

            if (session.role !== 'admin') {
                return {
                    success: false,
                    message: 'Permission denied'
                }
            }

            // Prevent admin from deleting themselves
            if (data.userId === session.userId) {
                return {
                    success: false,
                    message: 'Cannot delete your own account'
                }
            }

            // Check if the user has any sites
            const userHasSites = await userService.hasAssociatedSites(data.userId)
            if (userHasSites) {
                return {
                    success: false,
                    message: 'Cannot delete user with associated sites. Transfer or delete their sites first.'
                }

            }

            // Delete the user
            await userService.deleteUser(data.userId)

            return {
                success: true
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            return {
                success: false,
                message: error instanceof Error ? error.message : 'An unexpected error occurred'
            }
        }
    })