import { Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import CreateClothes from "@/pages/CreateClothes";
import AuthGuard from "@/guards/AuthGuard";
import Wardrobe from "@/pages/Wardrobe";
import Details from "@/pages/Details";
import Edit from "./pages/Edit";
import Outfits from "./pages/Outfits";
import CreateOutfit from "./pages/CreateOutfit";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/outfits" element={<AuthGuard />}>
        <Route index element={<Outfits />} />
        <Route path="create" element={<CreateOutfit />} />
      </Route>
      <Route path="/wardrobe" element={<AuthGuard />}>
        <Route index element={<Wardrobe />} />
        <Route path="create" element={<CreateClothes />} />
        <Route path=":itemId">
          <Route index element={<Details />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
