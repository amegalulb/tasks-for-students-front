import { Task, TaskStatuses } from '@/entities/task';
import { apiClient } from '@/services/client';
import { AxiosRequestConfig } from 'axios';
import { ResponseError } from '@/shared/types/ResponseError';

export interface Data {
  list: Task[];
  total: number
}

export interface Params {
  studentId?: number;
  status: TaskStatuses;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  limit: number;
  page: number;
}

export interface Config extends AxiosRequestConfig {
  params: Params
}

export type Error = ResponseError<Data, Params>

export const call = (config: Config) => apiClient.get<Data>('/tasks', config);
