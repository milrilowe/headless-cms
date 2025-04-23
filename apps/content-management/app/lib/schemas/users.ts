import { z } from "zod";

export const updateUserRoleSchema = z.object({
    userId: z.number(),
    role: z.enum(['superadmin', 'admin', 'user'])
}).refine((data) => data.role !== 'superadmin', {
    message: 'Superadmin role cannot be updated',
});