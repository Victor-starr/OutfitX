import { Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Create from "@/pages/Create";
import AuthGuard from "@/guards/AuthGuard";
import Wardrobe from "@/pages/Wardrobe";
import Details from "@/pages/Details";
import Edit from "./pages/Edit";
import Outfits from "./pages/Outfits";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/outfits" element={<Outfits />} />
      <Route path="/wardrobe" element={<AuthGuard />}>
        <Route index element={<Wardrobe />} />
        <Route path=":itemId">
          <Route index element={<Details />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="create" element={<Create />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
