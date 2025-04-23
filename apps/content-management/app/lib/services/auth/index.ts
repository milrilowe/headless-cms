import { login } from './login';
import { register } from './register';
import { getUserById } from './getUserById';
import { emailExists } from './emailExists';

export const authService = {
    login,
    register,
    getUserById,
    emailExists
};

export {
    login,
    register,
    getUserById,
    emailExists
};