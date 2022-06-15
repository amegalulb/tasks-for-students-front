import { apiClient } from '@/services/client';
import { ResponseError } from '@/shared/types/ResponseError';
import { AxiosRequestConfig } from 'axios';
import { TaskFile } from '@/entities/task';

export type Data = TaskFile[];

export interface Params {
  id: number
  files: File[];
}

export type Error = ResponseError<Data, Params>

export interface Config extends AxiosRequestConfig{
  params: Params;
}

export const call = ({ params, ...config }: Config) => {
  const formData = new FormData();

  params.files.forEach((file) => formData.append('files', file));

  return apiClient.post<Data>(`/tasks/${params.id}/uploadResponse`, formData, config);
};
