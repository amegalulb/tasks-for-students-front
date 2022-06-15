import { AxiosRequestConfig } from 'axios';
import { apiClient } from '@/services/client';

export interface Params {
  oldPassword: string;
  newPassword: string;
  id: number;
}

export interface Config extends AxiosRequestConfig {
  params: Params;
}

export const call = ({ params: { id, ...params }, ...config }: Config) => apiClient.post(`/auth/${id}/changePassword`, params, config);
