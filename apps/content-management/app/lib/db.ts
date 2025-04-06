import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient | undefined

export function getDB(): PrismaClient {
    if (!prismaClient) {
        prismaClient = new PrismaClient()
    }
    return prismaClient
}

export const db = getDB()