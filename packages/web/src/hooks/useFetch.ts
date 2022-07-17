import { AxiosRequestConfig } from "axios";
import useSWR from "swr";
import { api } from "~/configs/api";

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
