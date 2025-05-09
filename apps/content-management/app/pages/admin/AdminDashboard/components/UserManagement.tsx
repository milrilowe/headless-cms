import { useState } from 'react';
import {
    Trash2,
    Pencil,
    Shield,
    User as UserIcon,
    Loader2,
    MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

import type { ISession, IUser } from '@/types';
import { useNavigate } from '@tanstack/react-router';

interface UserManagementProps {
    users: Array<IUser>;
    session: ISession;
}

export function UserManagement({ users, session }: UserManagementProps) {
    const navigate = useNavigate();

    const [deletingUser, setDeletingUser] = useState<number | null>(null);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const handleDeleteUser = (user: IUser) => {
        setSelectedUser(user);
        setConfirmDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;

        try {
            setDeletingUser(selectedUser.id);

            // Add your delete logic here
            // await deleteUser({ userId: selectedUser.id })

            toast.success(`User ${selectedUser.email} deleted successfully`);
            // Refresh user list or filter out the deleted user
        } catch (error) {
            toast.error(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setDeletingUser(null);
            setConfirmDeleteDialog(false);
            setSelectedUser(null);
        }
    };

    const handleChangeRole = async (user: IUser, newRole: 'user' | 'admin') => {
        toast.info(`Changing ${user.email}'s role to ${newRole}... (Not implemented)`);
        // Implement role change logic here
    };

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableCaption>A list of all users in the system.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id} onClick={() => navigate({ to: `/user/${user.id}` })}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.name || 'Unnamed User'}</span>
                                            <span className="text-muted-foreground text-sm">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.systemRole === 'admin' ? 'destructive' : 'secondary'}
                                            className="capitalize"
                                        >
                                            {user.systemRole === 'admin' ? (
                                                <Shield className="h-3 w-3 mr-1" />
                                            ) : (
                                                <UserIcon className="h-3 w-3 mr-1" />
                                            )}
                                            {user.systemRole}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {/* Format createdAt in a user-friendly way if it exists */}
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <TooltipProvider>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />

                                                    {/* Edit option */}
                                                    <DropdownMenuItem
                                                        onClick={(e) => { e.stopPropagation(); console.log('hey') }}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        <span>Edit user</span>
                                                    </DropdownMenuItem>

                                                    {/* Change role options */}
                                                    {user.systemRole !== 'admin' && (
                                                        <DropdownMenuItem
                                                            onClick={(e) => { e.stopPropagation(); handleChangeRole(user, 'admin') }}
                                                            disabled={user.id === session.user.id}
                                                        >
                                                            <Shield className="mr-2 h-4 w-4" />
                                                            <span>Make admin</span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    {user.systemRole === 'admin' && (
                                                        <DropdownMenuItem
                                                            onClick={(e) => { e.stopPropagation(); handleChangeRole(user, 'user') }}
                                                            disabled={user.id === session.user.id}
                                                        >
                                                            <UserIcon className="mr-2 h-4 w-4" />
                                                            <span>Remove admin</span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    <DropdownMenuSeparator />

                                                    {/* Delete option */}
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteUser(user) }}
                                                        disabled={user.id === session.user.id}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete user</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm User Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the user "{selectedUser?.name || selectedUser?.email}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setConfirmDeleteDialog(false)}
                            disabled={!!deletingUser}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={!!deletingUser}
                        >
                            {deletingUser ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}