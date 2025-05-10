import { APIInstance } from "../app/api";
export enum WorkspaceRole {
    VIEW = 'view',
    EDIT = 'edit',
    ADMIN = 'admin'
}

export interface Workspace {
    name: string;
    cpuLimit: string;
    memoryLimit: string;
    gpuLimit: number;
    role: WorkspaceRole;
}

export interface WorkspaceResponse {
    workspace: Workspace;
    role: WorkspaceRole;
}

export interface WorkspacePermission {
    username: string;
    role: WorkspaceRole;
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
    const response = await APIInstance.get('/api/workspaces');
    const workspaceResponses: WorkspaceResponse[] = response.data;

    return workspaceResponses.map((workspaceResponse: WorkspaceResponse) => ({
        ...workspaceResponse.workspace,
        role: workspaceResponse.role
    }));
};

export const getWorspaceMembers = async (workspaceName: string): Promise<WorkspacePermission[]> => {
    const response = await APIInstance.get(`/api/workspaces/${workspaceName}/permissions`);
    return response.data;
};

export const saveWorkspace = async (workspaceData: Omit<Workspace, 'role'>) => {
    return APIInstance.post(`/api/workspaces`, workspaceData);
};

export const deleteWorkspace = async (workspaceName: string) => {
    return APIInstance.delete(`/api/workspaces/${workspaceName}`);
}

export const addUserToWorkspace = async (workspaceName: string, permission: WorkspacePermission) => {
    return APIInstance.post(`/api/workspaces/${workspaceName}/permissions`, permission);
}


export const removeUserFromWorkspace = async (workspaceName: string, username: string) => {
    return APIInstance.delete(`/api/workspaces/${workspaceName}/permissions/${username}`);
}