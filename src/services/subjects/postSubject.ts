import { apiClient } from '@/services/client';
import { Subject } from '@/entities/subject';
import { ResponseError } from '@/shared/types/ResponseError';
import { AxiosRequestConfig } from 'axios';

export interface Params {
  name: string;
}

export type Data = Subject;

export type Error = ResponseError<Data>;

export interface Config extends AxiosRequestConfig {
  params: Params
}

export const call = ({ params, ...config }: Config) => apiClient.post<Data>('/subjects', params, config);
