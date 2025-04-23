import { deleteUser } from './deleteUser';
import { getAllUsers } from './getAllUsers';
import { getUserById } from './getUserById';
import { hasWorkspaceAssociations } from './hasWorkspaceAssociations';
import { isSoleOwnerOfAWorkspace } from './isSoleOwnerOfAWorkspace';
import { updateUserRole } from './updateUserRole';

export const userService = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    hasWorkspaceAssociations,
    isSoleOwnerOfAWorkspace
};

export {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    hasWorkspaceAssociations,
    isSoleOwnerOfAWorkspace
}