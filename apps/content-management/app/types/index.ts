import type { User as PrismaUser } from '@prisma/client';
import type { Site as PrismaSite } from '@prisma/client';

// Session user with only essential info
export type ISession = {
    user: IUser,
    isAdmin: boolean
}

export type IUser = Omit<PrismaUser, 'password'>


export type StorageRegion = 'us-east-1' | 'us-west-1' | 'us-east-2' | 'us-west-2';
export type ISite = Omit<PrismaSite, 'storageRegion'> & {
    storageRegion: StorageRegion
};