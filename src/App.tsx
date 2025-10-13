import { Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import CreateClothes from "@/pages/clothes/CreateClothes";
import AuthGuard from "@/guards/AuthGuard";
import Wardrobe from "@/pages/clothes/Wardrobe";
import ClothesDetails from "@/pages/clothes/ClothesDetails";
import Edit from "./pages/clothes/ClothesEdit";
import Outfits from "./pages/outfits/Outfits";
import CreateOutfit from "./pages/outfits/CreateOutfit";
import OutfitDetails from "./pages/outfits/OutfitDetail";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/outfits" element={<AuthGuard />}>
        <Route index element={<Outfits />} />
        <Route path="create" element={<CreateOutfit />} />
        <Route path=":outfitId" element={<OutfitDetails />} />
      </Route>
      <Route path="/wardrobe" element={<AuthGuard />}>
        <Route index element={<Wardrobe />} />
        <Route path="create" element={<CreateClothes />} />
        <Route path=":itemId">
          <Route index element={<ClothesDetails />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
