import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
