import { apiClient } from '@/services/client';
import { ResponseError } from '@/shared/types/ResponseError';
import { AxiosRequestConfig } from 'axios';

export interface Params {
  name: string;
  description: string;
  studentId?: number;
  groupId?: number;
  files?: File[]
}

export type Error = ResponseError<{}, Params>

export interface Config extends AxiosRequestConfig{
  params: Params;
}

export const call = ({ params, ...config }: Config) => {
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => (key === 'files' ? value.map((file: File) => formData.append(key, file)) : formData.append(key, value)));

  return apiClient.post('/tasks', formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
