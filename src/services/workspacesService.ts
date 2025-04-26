import { APIInstance } from "../app/api";
export interface Workspace {
    name: string;
    cpuLimit: string;
    memoryLimit: string;
    gpuLimit: number;
}

export const getWorkspaces = async () => {
    return APIInstance.get('/api/workspaces');
};

export const saveWorkspace = async (workspaceData: Workspace) => {
    return APIInstance.post(`/api/workspaces`, workspaceData);
};

export const deleteWorkspace = async (workspaceName: string) => {
    return APIInstance.delete(`/api/workspaces/${workspaceName}`);
}