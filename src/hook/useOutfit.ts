import useApi from "./UseApi";
import { useState } from "react";
import type { Outfit, OutfitSections } from "@/types/outfits_types";
import { OutfitData } from "@/data/Outfits_Mocks";
import { parseAxiosErrorDetails } from "@/utils/parseAxiosErrorDetails";
import type { WardrobeItem } from "@/types/clothing_types";
import { useNavigate } from "react-router";
import type { handleOutfitSaveProps } from "@/components/FinalFormOutfit";

type ResType = {
  message: string;
  data: Outfit[] | [];
  status: number;
};
interface UseOutfitReturn {
  loading: boolean;
  result: ResType;
  fetchOutfits: () => Promise<void>;
  handleOutfitSave: (handleOutfitSaveProps: handleOutfitSaveProps) => void;
  handleItemClick: (item: WardrobeItem) => void;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<WardrobeItem["category"] | null>
  >;
  selectedCategory: WardrobeItem["category"] | null;
  outfitSections: OutfitSections;
}

const DEV: boolean = import.meta.env.VITE_DEV === "true";

export default function useOutfits(): UseOutfitReturn {
  const api = useApi();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    WardrobeItem["category"] | null
  >(null);
  const [outfitSections, setOutfitSections] = useState<OutfitSections>({
    Head: null,
    Accessories: null,
    Outerwear: null,
    Tops: null,
    Bottoms: null,
    Feet: null,
  });
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
  const handleOutfitSave = async ({ e, form, tags }: handleOutfitSaveProps) => {
    e.preventDefault();
    if (
      Object.values(outfitSections).every((section) => section !== null) &&
      form.name.trim() !== "" &&
      tags.length > 0
    ) {
      try {
        setIsLoading(true);
        const payload = {
          name: form.name,
          tags,
          clothes: {
            Head: outfitSections.Head,
            Accessories: outfitSections.Accessories,
            Outerwear: outfitSections.Outerwear,
            Tops: outfitSections.Tops,
            Bottoms: outfitSections.Bottoms,
            Feet: outfitSections.Feet,
          },
        };
        console.log("THE FINAL PAYLOAD:", payload);
        const res = await api.post("/outfit/create", payload);
        setResult({
          message: res.data.message,
          data: res.data.data,
          status: res.status,
        });
        navigate("/outfits");
        console.log("Outfit saved:", outfitSections);
      } catch (error) {
        const { message, status } = parseAxiosErrorDetails(error);
        console.error("Failed to save outfit:", { message, status });
        setResult((prev) => ({
          ...prev,
          message,
          status,
        }));
      } finally {
        setIsLoading(false);
      }
    } else {
      setResult((prev) => ({
        ...prev,
        message: "Please fill all sections of the outfit before saving.",
        status: 400,
      }));
      console.warn("Please fill all sections of the outfit before saving.");
    }
  };

  const handleItemClick = (item: WardrobeItem) => {
    if (!selectedCategory) return;

    if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      console.warn(
        `Cannot assign ${item.category} item to ${selectedCategory} slot`
      );
      return;
    }

    setOutfitSections((prev) => ({
      ...prev,
      [selectedCategory]: { ...item },
    }));
    setSelectedCategory(null);
  };

  return {
    loading,
    result,
    fetchOutfits,
    handleOutfitSave,
    handleItemClick,
    setSelectedCategory,
    selectedCategory,
    outfitSections,
  };
}
