import { z } from "zod";

export const workspaceFormSchema = z.object({
    name: z.string().min(3, "Workspace name must be at least 3 characters"),
    slug: z.string()
      .min(3, "Slug must be at least 3 characters")
      .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
});