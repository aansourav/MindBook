import axios from "axios";
import { useEffect } from "react";
import api from "../api";
import { useAuth } from "./useAuth";

const useAPI = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              {
                refreshToken,
              }
            );
            const token = response.data;
            setAuth({ ...auth, authToken: token });
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return originalRequest;
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.authToken]);

  return {api};
};

export default useAPI;
