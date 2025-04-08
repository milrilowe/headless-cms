import { AdminFeature } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement, SiteManagement } from './components';

export function Dashboard({ user, users, sites }) {
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
            <AdminFeature user={user} fallback={<SiteManagement sites={sites} />}>
                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="sites">Sites</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users">
                        <UserManagement users={users} />
                    </TabsContent>
                    <TabsContent value="sites">
                        <SiteManagement sites={sites} />
                    </TabsContent>
                </Tabs>
            </AdminFeature>
        </div>
    );
}