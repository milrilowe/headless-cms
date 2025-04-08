import { db } from '@/lib/db'
import type { Site } from '@prisma/client'

export const siteService = {
    // Get all sites for a user
    async getSitesByUserId(userId: number) {
        return db.site.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    },

    // Get site by ID
    async getSiteById(id: number) {
        return db.site.findUnique({
            where: { id }
        });
    },

    // Create a new site
    async createSite(data: Omit<Site, 'id' | 'createdAt' | 'updatedAt' | 'lastPublishedAt'>) {
        return db.site.create({
            data
        });
    },

    // Update a site
    async updateSite(id: number, data: Partial<Omit<Site, 'id' | 'createdAt' | 'updatedAt'>>) {
        return db.site.update({
            where: { id },
            data
        });
    },

    // Delete a site
    async deleteSite(id: number) {
        return db.site.delete({
            where: { id }
        });
    }
}