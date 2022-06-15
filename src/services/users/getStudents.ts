import { apiClient } from '@/services/client';
import { AxiosRequestConfig } from 'axios';
import { ResponseError } from '@/shared/types/ResponseError';
import { User } from '@/entities/user';

export interface Params {
  groupId: number;
}

export type Data = User[];

export type Error = ResponseError<Data, Params>;

export interface Config extends AxiosRequestConfig {
  params: Params;
}

export const call = (config?: Config) => (apiClient.get<Data>('/users/students', config));
