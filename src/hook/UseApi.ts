import axios from "axios";
import { useAuth } from "react-oidc-context";

export default function useApi() {
  const auth = useAuth();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_URL,
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
    },
  });

  return {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
  };
}
