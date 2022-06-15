import { apiClient } from '@/services/client';
import { ResponseError } from '@/shared/types/ResponseError';

export interface Data {
  accessToken: string;
}

export type Error = ResponseError;

export const call = () => apiClient.post<Data>('/auth/refresh');
