import { apiClient } from '@/services/client';
import { Subject } from '@/entities/subject';
import { ResponseError } from '@/shared/types/ResponseError';

export interface Data {
  list: Subject[];
  total: number;
}

export type Error = ResponseError<Data>

export const call = () => apiClient.get<Data>('/subjects');
