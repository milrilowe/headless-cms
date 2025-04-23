import { createSite } from "./createSite";
import { deleteSite } from "./deleteSite";
import { getSiteById } from "./getSiteById";
import { getSitesByWorkspaceId } from "./getSitesByWorkspaceId";
import { getSitesForUser } from "./getSitesForUser";
import { updateSite } from "./updateSite";
import { userHasAccessToSite } from "./userHasAccessToSite";
import { userHasPermissionForSite } from "./userHasPermissionForSite";

export const siteService = {
    createSite,
    deleteSite,
    getSiteById,
    getSitesByWorkspaceId,
    getSitesForUser,
    updateSite,
    userHasAccessToSite,
    userHasPermissionForSite
};

export {
    createSite,
    deleteSite,
    getSiteById,
    getSitesByWorkspaceId,
    getSitesForUser,
    updateSite,
    userHasAccessToSite,
    userHasPermissionForSite
};