import { ConstructionIcon } from 'lucide-react';

export function SiteManagement({ sites }: { sites: any[] }) {
    return (
        <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 flex flex-col items-center justify-center text-center">
            <ConstructionIcon className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-lg font-medium">Site Management</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mt-2">
                This feature is under development and will be available soon.
            </p>
        </div>
    );
}