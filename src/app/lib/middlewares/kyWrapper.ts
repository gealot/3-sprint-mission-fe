import type { Options } from 'ky';
import ky from 'ky';

const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://panda-market-api.vercel.app',
  timeout: 5000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};

const TokenStorage = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  removeAccessToken: () => localStorage.removeItem('accessToken'),
};

const handleUnauthorized = () => {
  console.error('Unauthorized. Redirecting to login...');
  // Add your login redirection logic here
};

const addAuthHeader = (request: Request): void => {
  const token = TokenStorage.getAccessToken();
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

export const logResponse = (response: Response): void => {
  if (response.ok && response.status === 200) {
    console.log('Success:', response.status);
  }
};

const handleResponse = async (
  request: Request,
  options: Options,
  response: Response,
): Promise<void> => {
  if (!response.ok && response.status === 401) {
    handleUnauthorized();
  }
  logResponse(response);
};

// types/api.ts
export type ApiConfig = {
  baseURL: string;
  timeout: number;
  defaultHeaders: Record<string, string>;
};

type ApiHooks = {
  beforeRequest: ((request: Request) => void)[];
  afterResponse: ((
    request: Request,
    options: Options,
    response: Response,
  ) => Promise<void>)[];
};

type JsonBody = Record<string, unknown>;

const createApiHooks = (): ApiHooks => ({
  beforeRequest: [addAuthHeader],
  afterResponse: [handleResponse],
});

const createKyClient = (config: ApiConfig = API_CONFIG) => {
  const hooks = createApiHooks();

  return ky.create({
    prefixUrl: config.baseURL,
    timeout: config.timeout,
    headers: config.defaultHeaders,
    hooks,
  });
};

/**
 * Generic GET request
 * @param endpoint - API endpoint
 * @param options - Ky options
 * @returns Promise with the parsed response
 */
export const kyGet = async <T>(
  endpoint: string,
  options?: Options,
): Promise<T> => {
  const response = await kyClient.get(endpoint, options);
  return response.json<T>();
};

/**
 * Generic POST request
 * @param endpoint - API endpoint
 * @param body - Request body
 * @param options - Additional Ky options
 * @returns Promise with the parsed response
 */
export const kyPost = async <T>(
  endpoint: string,
  body: JsonBody,
  options?: Omit<Options, 'json'>,
): Promise<T> => {
  const response = await kyClient.post(endpoint, {
    ...options,
    json: body,
  });
  return response.json<T>();
};

/**
 * Generic PATCH request
 * @param endpoint - API endpoint
 * @param body - Request body
 * @param options - Additional Ky options
 * @returns Promise with the parsed response
 */
export const kyPatch = async <T>(
  endpoint: string,
  body: JsonBody,
  options?: Omit<Options, 'json'>,
): Promise<T> => {
  const response = await kyClient.patch(endpoint, {
    ...options,
    json: body,
  });
  return response.json<T>();
};

/**
 * Generic DELETE request
 * @param endpoint - API endpoint
 * @param options - Ky options
 * @returns Promise with the parsed response
 */
export const kyDelete = async <T>(
  endpoint: string,
  options?: Options,
): Promise<T> => {
  const response = await kyClient.delete(endpoint, options);
  return response.json<T>();
};

export const kyClient = createKyClient();

// Example usage:
// import { apiClient } from './lib/api-client';
//
// const fetchData = async <T>(endpoint: string): Promise<T> => {
//   const response = await apiClient.get(endpoint);
//   return response.json();
// };
