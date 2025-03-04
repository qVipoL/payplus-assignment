import { axiosInstance } from "@refinedev/simple-rest";

export const ACCESS_TOKEN_KEY = "access-token";

export const BASE_URL = "http://localhost:3000";

export const apiInstance = axiosInstance;

// Set the base URL for the API
apiInstance.defaults.baseURL = BASE_URL;

// Add the access token to the request headers
apiInstance.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Bearer ${localStorage.getItem(
    ACCESS_TOKEN_KEY
  )}`;

  return request;
});
