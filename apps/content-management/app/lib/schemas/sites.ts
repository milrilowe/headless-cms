import { z } from "zod";

export const createSiteFormSchema = z.object({
    name: z.string(),
    domain: z.string(),
    storageRegion: z.enum([
        "us-east-1",
        "us-west-1",
        "us-east-2",
        "us-west-2",
    ])
});

export const createSiteSchema = createSiteFormSchema.extend({
    organizationId: z.number()
});

export const updateSiteFormSchema = z.object({
    name: z.string(),
    domain: z.string(),
    storageRegion: z.enum([
        "us-east-1",
        "us-west-1",
        "us-east-2",
        "us-west-2",
    ])
});

export const updateSiteSchema = updateSiteFormSchema.extend({
    id: z.number()
});

export type CreateSiteFormInput = z.infer<typeof createSiteFormSchema>;
export type CreateSitePayload = z.infer<typeof createSiteSchema>;
export type UpdateSiteFormInput = z.infer<typeof updateSiteFormSchema>;
export type UpdateSitePayload = z.infer<typeof updateSiteSchema>;