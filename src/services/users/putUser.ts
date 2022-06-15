import { User, UserProfile } from '@/entities/user';
import { AxiosRequestConfig } from 'axios';
import { apiClient } from '@/services/client';

export type Data = UserProfile;

export type Params = Omit<User, 'role' | 'fullName'>;

export interface Config extends AxiosRequestConfig {
  params: Params;
}

export const call = ({ params: { id, ...params }, ...config }: Config) => apiClient.put(`/users/${id}`, params, config);
