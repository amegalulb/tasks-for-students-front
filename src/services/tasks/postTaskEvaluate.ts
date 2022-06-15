import { apiClient } from '@/services/client';
import { GradeMark, Task } from '@/entities/task';
import { ResponseError } from '@/shared/types/ResponseError';
import { AxiosRequestConfig } from 'axios';

export type Data = Task;

export interface Params {
  id: number | string;
  mark: GradeMark;
}

export type Error = ResponseError<Data, Params>

export interface Config extends AxiosRequestConfig{
  params: Params;
}

export const call = ({ params, ...config }: Config) => apiClient.post<Data>(`/tasks/${params.id}/evaluate`, { mark: params.mark }, config);
