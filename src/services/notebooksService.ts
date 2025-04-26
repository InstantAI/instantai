// src/services/notebooksService.ts
import { AxiosResponse } from "axios";
import { APIInstance } from "../app/api";

export interface NotebookCondition {
    lastProbeTime: string;
    lastTransitionTime: string;
    status: string;
    type: string;
}

export interface NotebookContainer {
    name: string;
    image: string;
    ports?: { containerPort: number; name: string; protocol: string }[];
    resources?: {
        limits?: { cpu?: string; memory?: string };
        requests?: { cpu?: string; memory?: string };
    };
    env?: { name: string; value: string }[];
}

export interface NotebookSpec {
    template: {
        spec: {
            containers: NotebookContainer[];
        };
    };
}

export interface NotebookMetadata {
    name: string;
    namespace: string;
    creationTimestamp: string;
    uid: string;
    resourceVersion: string;
    annotations?: Record<string, string>;
}

export interface NotebookStatus {
    conditions: NotebookCondition[];
    containerState?: Record<string, unknown>;
    readyReplicas?: number;
}

export interface Notebook {
    apiVersion: string;
    kind: string;
    metadata: NotebookMetadata;
    spec: NotebookSpec;
    status: NotebookStatus;
}

export const getNotebooks = async (namespace: string): Promise<AxiosResponse<Notebook[]>> => {
    return APIInstance.get(`/api/notebooks/${namespace}`);
};

export const saveNotebook = async (namespace: string, notebookData: NotebookContainer) => {
    return APIInstance.post(`/api/notebooks/${namespace}`, notebookData);
};

export const deleteNotebook = async (namespace: string, name: string) => {
    return APIInstance.delete(`/api/notebooks/${namespace}?name=${name}`);
};

export const startNotebook = async (namespace: string, name: string) => {
    return APIInstance.put(`/api/notebooks/${namespace}/${name}/status`, null, {
        params: {
            action: 'start'
        }
    });
};

export const stopNotebook = async (namespace: string, name: string) => {
    return APIInstance.put(`/api/notebooks/${namespace}/${name}/status`, null, {
        params: {
            action: 'stop'
        }
    });
};