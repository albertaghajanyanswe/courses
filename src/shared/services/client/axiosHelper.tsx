import axios from 'axios';

/*
 * when need to add Bearer token
 */
const AUTH_TOKEN = 'auth_token';

const getAuthHeader = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (authToken) {
    return { Authorization: `Bearer ${authToken}` };
  }
  return null;
};

const defaultHeaderHandler = (request: any) => {
  const authHeader = getAuthHeader();
  if (authHeader) {
    request.headers = authHeader;
  }
  return request;
};

let service: ReturnType<typeof axios.create>;

if (process.env.REACT_APP_ENV_MODE === 'production') {
  service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 60000,
  });
} else {
  service = axios.create({
    baseURL: `https://logiclike.com`,
    timeout: 60000,
  });
}

service.interceptors.request.use(defaultHeaderHandler);

/*
 * customize interceptors to suit your needs
 */
const setupInterceptors = () => {
  service.interceptors.request.use(defaultHeaderHandler);
};

const apiClient = <T, O>(method: string | undefined, options: O) => {
  return service
    .request<T>({
      ...options,
      method,
    })
    .catch((error: any) => Promise.reject(error));
};

export { apiClient, setupInterceptors, service as axiosInstance };
