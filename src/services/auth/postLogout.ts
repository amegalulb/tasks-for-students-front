import { apiClient } from '@/services/client';
import { ResponseError } from '@/shared/types/ResponseError';

export type Error = ResponseError;

export const call = () => apiClient.post('/auth/logout');
