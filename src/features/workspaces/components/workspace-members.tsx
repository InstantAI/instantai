import { getWorspaceMembers, WorkspacePermission, WorkspaceRole } from '@/services/workspacesService'
import { useEffect, useState } from 'react'

interface WorkspaceMembersProps {
    workspaceName: string
}

export function WorkspaceMembers({ workspaceName }: WorkspaceMembersProps) {
    const [members, setMembers] = useState<WorkspacePermission[]>([])

    useEffect(() => {
        setMembers([]);
        getWorspaceMembers(workspaceName).then(data => setMembers(data))
    }, [workspaceName])

    const roleDisplayNames = {
        [WorkspaceRole.VIEW]: 'Viewer',
        [WorkspaceRole.EDIT]: 'Editor',
        [WorkspaceRole.ADMIN]: 'Admin'
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">{workspaceName}'s Members</h3>
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.username}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {roleDisplayNames[member.role]}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No members found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}