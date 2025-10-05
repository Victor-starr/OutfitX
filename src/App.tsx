import { Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Create from "@/pages/Create";
import AuthGuard from "@/guards/AuthGuard";
import Wardrobe from "@/pages/Wardrobe";
import Details from "@/pages/Details";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/wardrobe" element={<AuthGuard />}>
        <Route index element={<Wardrobe />} />
        <Route path="details/:itemId" element={<Details />} />
        <Route path="create" element={<Create />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
