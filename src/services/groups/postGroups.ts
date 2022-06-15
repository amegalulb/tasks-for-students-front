import { apiClient } from '@/services/client';
import { ResponseError } from '@/shared/types/ResponseError';
import { AxiosRequestConfig } from 'axios';
import { Group } from '@/entities/group';

export interface Params {
  name: string;
}

export type Data = Group;

export type Error = ResponseError<Data>;

export interface Config extends AxiosRequestConfig {
  params: Params
}

export const call = ({ params, ...config }: Config) => apiClient.post<Data>('/groups', params, config);
