import { apiClient } from '@/services/client';
import { AxiosRequestConfig } from 'axios';
import { ResponseError } from '@/shared/types/ResponseError';
import { UserProfile } from '@/entities/user';

export type Data = UserProfile;

export type Error = ResponseError<Data, {}>;

export const call = (config?: AxiosRequestConfig) => apiClient.get<Data>('/users/profile', config);
