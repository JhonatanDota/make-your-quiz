import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import MakeQuiz from "./pages/MakeQuiz";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Menu />
        <div className="p-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/make-yours" element={<MakeQuiz />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
