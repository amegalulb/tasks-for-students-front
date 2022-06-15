import { apiClient } from '@/services/client';
import { ResponseError } from '@/shared/types/ResponseError';
import { Group } from '@/entities/group';

export interface Data {
  list: Group[];
  total: number;
}

export type Error = ResponseError<Data>

export const call = () => apiClient.get<Data>('/groups');
