import type { WardrobeItem } from "@/types/items_types";
import { useEffect, useState } from "react";
import useApi from "./UseApi";
import { useAuth } from "react-oidc-context";
import { WardrobeData } from "@/data/Mocks";

type ResType = {
  message: string;
  data: WardrobeItem[] | [];
  status: number;
};
interface UseWardrobeReturn {
  loading: boolean;
  result: ResType;
}

export default function useWardrobe(): UseWardrobeReturn {
  const auth = useAuth();
  const api = useApi();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<ResType>({
    message: "",
    data: [],
    status: 0,
  });

  const DEV: boolean = import.meta.env.VITE_DEV === "true";

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResult({
          message: "Mock data fetched",
          data: WardrobeData,
          status: 200,
        });
        console.log("Using mock data for wardrobe");
      } else {
        const res = await api.get("/clothes/getwardrobe");
        if (res.status === 200) {
          setResult({
            message: res.statusText,
            data: res.data,
            status: res.status,
          });
          console.table(res.data);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [auth.user?.access_token]);
  return {
    loading,
    result,
  };
}
