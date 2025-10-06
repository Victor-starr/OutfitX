import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: unknown): string => {
  const err = error as AxiosError<{ error?: string; message?: string }>;
  return (
    err.response?.data?.error || err.response?.data?.message || "Unknown error"
  );
};
