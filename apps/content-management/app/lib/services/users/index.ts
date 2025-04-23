import { deleteUser } from './deleteUser';
import { getAllUsers } from './getAllUsers';
import { getUserById } from './getUserById';
import { hasOrganizationAssociations } from './hasOrganizationAssociations';
import { isSoleOwnerOfAnOrganization } from './isSoleOwnerOfAnOrganization';
import { updateUserRole } from './updateUserRole';

export const userService = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    hasOrganizationAssociations,
    isSoleOwnerOfAnOrganization
};

export { 
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    hasOrganizationAssociations,
    isSoleOwnerOfAnOrganization
}