import { apiClient } from '@/services/client';
import { RoleNames, User } from '@/entities/user';
import { UserData } from '@/services/auth/register/types';
import { AxiosRequestConfig } from 'axios';

export type Data = User;

export type UserParams = UserData & { role: RoleNames.Admin };

export interface Params {
  user: UserParams;
}

export interface Config extends AxiosRequestConfig {
  params: Params;
}

export const call = ({ params, ...config }: Config) => apiClient.post<Data>('/auth/register/admin', params.user, config);
