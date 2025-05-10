import { getWorspaceMembers, WorkspacePermission, WorkspaceRole, removeUserFromWorkspace, addUserToWorkspace } from '@/services/workspacesService'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconTrash, IconUserPlus } from '@tabler/icons-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { UsersInviteDialog } from './users-invite-dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface WorkspaceMembersProps {
    workspaceName: string
}

export function WorkspaceMembers({ workspaceName }: WorkspaceMembersProps) {
    const [members, setMembers] = useState<WorkspacePermission[]>([])
    const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<string | null>(null)

    const refreshMembers = () => {
        getWorspaceMembers(workspaceName).then(data => setMembers(data))
    }

    useEffect(() => {
        refreshMembers()
    }, [workspaceName])


    const roleOptions = [
        { label: 'Viewer', value: WorkspaceRole.VIEW },
        { label: 'Editor', value: WorkspaceRole.EDIT },
    ]

    const handleRoleChange = async (username: string, newRole: WorkspaceRole) => {
        try {
            await addUserToWorkspace(workspaceName, { username, role: newRole })
            toast({
                title: 'Role updated',
                description: `User ${username}'s role has been updated to ${newRole === WorkspaceRole.VIEW ? 'Viewer' : 'Editor'}.`,
            })
            refreshMembers()
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update user role.',
                variant: 'destructive'
            })
        }
    }

    const handleDeleteUser = async () => {
        if (!userToDelete) return;

        try {
            await removeUserFromWorkspace(workspaceName, userToDelete)
            toast({
                title: 'User removed',
                description: `User ${userToDelete} has been removed from the workspace.`,
            })
            refreshMembers()
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to remove user.',
                variant: 'destructive'
            })
        } finally {
            setUserToDelete(null)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{workspaceName}'s Members</h3>
                <Button
                    variant='outline'
                    className='space-x-1'
                    onClick={() => setInviteDialogOpen(true)}
                >
                    <span>Invite User</span> <IconUserPlus size={18} />
                </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.username}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <Select
                                            value={member.role}
                                            onValueChange={(value) => handleRoleChange(member.username, value as WorkspaceRole)}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roleOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => setUserToDelete(member.username)}
                                        >
                                            <IconTrash className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No members found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <UsersInviteDialog
                open={inviteDialogOpen}
                onOpenChange={setInviteDialogOpen}
                selectedWorkspace={workspaceName}
                onSuccess={refreshMembers}
            />

            <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove {userToDelete} from this workspace? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}