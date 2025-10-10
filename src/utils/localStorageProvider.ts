import type { WardrobeItem } from "@/types/items_types";

type WardrobeCacheType = {
  message: string;
  data: WardrobeItem[];
  status: number;
};

export function localStorageProvider() {
  const map = new Map<string, WardrobeCacheType>(
    JSON.parse(localStorage.getItem("swr-cache") || "[]")
  );

  const saveCache = () => {
    try {
      const entries = JSON.stringify(Array.from(map.entries()));
      localStorage.setItem("swr-cache", entries);
    } catch (err) {
      console.error("Failed to save SWR cache to localStorage:", err);
    }
  };

  const originalSet = map.set;
  map.set = function (...args) {
    const result = originalSet.apply(this, args);
    saveCache();
    return result;
  };

  const originalDelete = map.delete;
  map.delete = function (...args) {
    const result = originalDelete.apply(this, args);
    saveCache();
    return result;
  };

  return map;
}
