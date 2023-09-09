import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import User from "./pages/User";
import Login from "./pages/Login";
import MakeQuiz from "./pages/MakeQuiz";
import QuizList from "./pages/QuizList";
import AnswerQuiz from "./pages/AnswerQuiz";
import AnsweredQuizList from "./pages/AnsweredQuizList";

export default function AppRoutes() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex h-full">
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
        <div
          className={`mt-14 py-8 px-4 ${
            showMenu ? "ml-auto w-5/6 md:w-full ease-in duration-300" : "w-full"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/make-yours"
              element={<MakeQuiz isMenuOpen={showMenu} />}
            />
            <Route path="/list-quizes" element={<QuizList />} />
            <Route path="/answer-quiz/:id" element={<AnswerQuiz />} />

            <Route path="/answered-quiz-list" element={<AnsweredQuizList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
