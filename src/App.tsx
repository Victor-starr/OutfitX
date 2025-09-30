import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import WareDrobeCreate from "./pages/WareDrobeCreate";
import AuthGuard from "./guards/AuthGuard";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route element={<AuthGuard />}>
        <Route path="/clothes/create" element={<WareDrobeCreate />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
