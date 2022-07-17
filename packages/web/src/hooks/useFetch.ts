import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_BASE_URL,
});

export function useFetch<T = unknown>(
  url: string | null,
  options?: AxiosRequestConfig
) {
  const { data, error, isValidating } = useSWR(url, async () => {
    const response = await api.get<T>(url!, options);
    return response.data;
  });

  return { data, error, isValidating };
}
