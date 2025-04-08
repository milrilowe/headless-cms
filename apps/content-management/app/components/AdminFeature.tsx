import { ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';

type AdminOnlyProps = {
    user: any;
    children: ReactNode;
    fallback?: ReactNode;
};

export function AdminFeature({ user, children, fallback = null }: AdminOnlyProps) {
    if (user.role !== 'admin') {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}