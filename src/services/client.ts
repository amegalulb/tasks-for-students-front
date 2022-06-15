import axios from 'axios';
import { onRejectedResponse, onRequest } from '@/services/interceptors';

const baseURL = process.env.REACT_APP_API_HOST || '/';

const apiClient = axios.create({ baseURL, withCredentials: true });

apiClient.interceptors.request.use(onRequest);
apiClient.interceptors.response.use((r) => r, onRejectedResponse);

// interface Success<D> {
//   error: null;
//   data: D;
// }
//
// interface Failed<E> {
//   error: E;
//   data: null;
// }
//
// export type ApiResponse<D, E> = Success<D> | Failed<E>;
//
// interface ApiRequestConfig extends AxiosRequestConfig {
//   url: string;
//   method: Method;
// }

// const apiRequest = <D, E>(config: ApiRequestConfig): Promise<ApiResponse<D, E>> => instance
//   .request<D>(config)
//   .then((response) => ({ error: null, data: response.data }))
//   .catch((error) => {
//     if (error?.data?.error) {
//       return { error: error.data.error, data: null };
//     }
//     return { error: 'unknown error', data: null };
//   });

export { apiClient };
