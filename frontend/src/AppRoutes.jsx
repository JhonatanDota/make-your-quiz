import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import MakeQuiz from "./pages/MakeQuiz";

export default function AppRoutes() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex h-full">
        <Menu showMenu={showMenu} setShowMenu={setShowMenu}/>
        <div className={`py-8 px-4 ${showMenu ? "ml-auto w-5/6" : "w-full"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/make-yours" element={<MakeQuiz />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
