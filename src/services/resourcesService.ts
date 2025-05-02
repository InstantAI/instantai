import { APIInstance } from "../app/api";
export interface NodeUsage {
    nodeName: string;
    cpuPercent: number;
    memoryPercent: number;
}

export const getNodeUsage = async (): Promise<NodeUsage[]> => {
    const response = await APIInstance.get('/api/resources/nodes/metrics');
    return response.data;
};