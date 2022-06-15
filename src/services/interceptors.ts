import { AxiosError, AxiosRequestConfig } from 'axios';

import { apiClient } from '@/services/client';
import { store } from '@/app/store';
import { refresh } from '@/features/Auth/actions';
import { Data } from '@/services/auth/postRefresh';

export const onRequest = async (config: AxiosRequestConfig) => {
  const { token } = store.getState().auth;

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};

type RejectedPayload = AxiosError & { config: AxiosRequestConfig & { isRetry?: boolean } };

let refreshRequest: Promise<Data> | null = null;

const REFRESH_URL = '/auth/refresh';

export const onUnauthorizedError = async (error: AxiosError) => {
  const { config } = error;
  config.baseURL = '';
  const newConfig = { ...config, isRetry: true };

  if (config.url === REFRESH_URL) {
    window.location.href = '/auth';
  }

  if (!refreshRequest) {
    refreshRequest = store.dispatch(refresh()).unwrap();
  }

  await refreshRequest;

  refreshRequest = null;

  return apiClient(newConfig);
};

export const UNAUTHORIZED_ERROR = 401;

export const onRejectedResponse = async (payload: RejectedPayload) => {
  const { response, config } = payload;

  if (response?.status === UNAUTHORIZED_ERROR) {
    if (config?.isRetry) {
      throw payload;
    }

    return onUnauthorizedError(payload);
  }

  return Promise.reject(payload);
};
