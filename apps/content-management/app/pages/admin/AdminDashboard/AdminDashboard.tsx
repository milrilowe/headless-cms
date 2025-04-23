import { AdminFeature } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement, SiteManagement } from './components';

export function Dashboard({ user, users }) {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Welcome back, {user?.name || 'User'}!
                </p>
            </div>

            {/* Admin Tabs using shadcn/ui */}
            <UserManagement users={users} />

        </div>
    );
}