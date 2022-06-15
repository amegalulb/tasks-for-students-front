import { apiClient } from '@/services/client';
import { Task, TaskStatuses } from '@/entities/task';
import { ResponseError } from '@/shared/types/ResponseError';
import { AxiosRequestConfig } from 'axios';

export type Data = Task;

export interface Params {
  id: number | string;
  status: TaskStatuses;
}

export type Error = ResponseError<Data, Params>

export interface Config extends AxiosRequestConfig{
  params: Params;
}

export const call = ({ params, ...config }: Config) => apiClient.post<Data>(`/tasks/${params.id}/status`, { status: params.status }, config);
