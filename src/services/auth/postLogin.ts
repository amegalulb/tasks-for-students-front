import { AxiosRequestConfig } from 'axios';
import { ResponseError } from '@/shared/types/ResponseError';
import { UserData } from '@/entities/user';
import { apiClient } from '../client';

export interface Params {
  email: string;
  password: string;
}

export interface Data {
  token: string;
  userData: UserData;
}

export type Error = ResponseError<Data, Params>;

interface Config extends AxiosRequestConfig {
  params: Params
}

export const call = ({ params, ...config }: Config) => apiClient.post<Data>('/auth/login', params, config);
