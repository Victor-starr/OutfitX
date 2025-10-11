import useApi from "./UseApi";
import { useState } from "react";
import type { Outfit } from "@/types/outfits_types";
import { OutfitData } from "@/data/Outfits_Mocks";
import { parseAxiosErrorDetails } from "@/utils/parseAxiosErrorDetails";

type ResType = {
  message: string;
  data: Outfit[] | [];
  status: number;
};
interface UseOutfitReturn {
  loading: boolean;
  result: ResType;
  fetchOutfits: () => Promise<void>;
}
const DEV: boolean = import.meta.env.VITE_DEV === "true";

export default function useOutfits(): UseOutfitReturn {
  const api = useApi();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResType>({
    message: "Not loaded",
    data: [],
    status: 0,
  });

  const fetchOutfits = async () => {
    setIsLoading(true);
    try {
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResult({
          message: "Mock data fetched",
          data: OutfitData,
          status: 200,
        });
        console.log("Using mock data for wardrobe", OutfitData);
      } else {
        const res = await api.get("/outfit");
        console.log("using Api for outfit", res);
        setResult({
          message: res.data.message,
          data: res.data.data,
          status: res.status,
        });
      }
    } catch (err) {
      const { message, status } = parseAxiosErrorDetails(err);
      console.error("Failed to fetch wardrobe:", { message, status });
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
    fetchOutfits,
  };
}
