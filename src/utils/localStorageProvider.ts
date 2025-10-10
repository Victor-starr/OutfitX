import type { WardrobeItem } from "@/types/items_types";

type WardrobeCacheType = {
  message: string;
  data: WardrobeItem[];
  status: number;
};

export function localStorageProvider() {
  // Read from localStorage
  const map = new Map<string, WardrobeCacheType>(
    JSON.parse(localStorage.getItem("swr-cache") || "[]")
  );

  // Save cache on unload
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("swr-cache", appCache);
  });

  return map;
}
