import type { WardrobeItem } from "@/types/items_types";
import { useState } from "react";
import useApi from "./UseApi";
import { WardrobeData, DetailData } from "@/data/Mocks";
import { parseAxiosErrorDetails } from "@/utils/parseAxiosErrorDetails";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import useSWR, { mutate } from "swr";

type ResType = {
  message: string;
  data: WardrobeItem[] | [];
  status: number;
};
interface UseWardrobeReturn {
  loading: boolean;
  result: ResType;
  fetchItem: () => Promise<void>;
  fetchData: () => Promise<void>;
  handleDeleteItem: () => Promise<void>;
}
interface useWardrobeProps {
  itemId?: string | undefined;
}

export default function useWardrobe({
  itemId,
}: useWardrobeProps = {}): UseWardrobeReturn {
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<ResType>({
    message: "Not loaded",
    data: [],
    status: 0,
  });

  const DEV: boolean = import.meta.env.VITE_DEV === "true";

  const fetcher = async (url: string) => {
    const res = await api.get(url);
    return res.data;
  };

  // ✅ SWR cache key for clothing
  const wardrobeKey = "/clothes/getwardrobe";
  const { data: cachedData } = useSWR(!DEV ? wardrobeKey : null, fetcher, {
    revalidateOnMount: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  async function fetchData() {
    setIsLoading(true);
    try {
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResult({
          message: "Mock data fetched",
          data: WardrobeData,
          status: 200,
        });
        console.log("Using mock data for wardrobe", WardrobeData);
      } else {
        if (cachedData) {
          console.log("Using SWR cached data for wardrobe", cachedData);
          setResult({
            message: cachedData.message,
            data: cachedData.data,
            status: 200,
          });
        } else {
          const res = await api.get("/clothes/getwardrobe");
          console.log("Using API for wardrobe", res);
          setResult({
            message: res.data.message,
            data: res.data.data,
            status: res.status,
          });
          // Update SWR cache
          mutate(wardrobeKey, res.data);
        }
      }
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to fetch wardrobe:", { message, status });
      setResult({
        message: message,
        data: [],
        status: status,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchItem() {
    setIsLoading(true);
    try {
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResult({
          message: "Mock data fetched",
          data: [DetailData],
          status: 200,
        });
        console.log("Using mock data for item details", DetailData);
      } else {
        const res = await api.get(`/clothes/${itemId}`);
        setResult({
          message: res.data.message,
          data: [res.data.data],
          status: res.status,
        });
      }
      setIsLoading(false);
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to fetch item details:", { message, status });
      setResult({
        message: message,
        data: [],
        status: status,
      });
      setIsLoading(false);
    }
  }

  const handleDeleteItem = async () => {
    if (auth.user?.profile?.sub !== result.data[0]?.userId) {
      console.error("You are not authorized to delete this item.");
      return;
    }
    try {
      setIsLoading(true);
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Mock delete item with ID:", itemId);
      } else {
        const res = await api.delete(`/clothes/${itemId}`, {
          data: { itemId },
        });
        setResult({
          message: res.data.message,
          data: [],
          status: res.status,
        });
        // Update SWR cache
        mutate(wardrobeKey, res.data);
      }
      navigate("/wardrobe");
      console.log("Deleting item with ID:", itemId);
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to delete item:", { message, status });
      setResult({
        message,
        data: [],
        status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loading,
    result,
    fetchItem,
    fetchData,
    handleDeleteItem,
  };
}
