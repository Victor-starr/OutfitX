import axios from "axios";

export interface AxiosErrorInfo {
  message: string;
  status: number;
}

/**
 * Parses an Axios or unknown error into a consistent structure.
 */
export function parseAxiosErrorDetails(error: unknown): AxiosErrorInfo {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data as
      | { error?: string; message?: string }
      | undefined;

    const message =
      data?.error ||
      data?.message ||
      error.message ||
      "An unexpected error occurred";

    return { message, status };
  }

  if (error instanceof Error) {
    return { message: error.message, status: 500 };
  }
  return { message: "Unknown error", status: 500 };
}
