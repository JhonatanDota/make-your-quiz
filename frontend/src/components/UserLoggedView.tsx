import { useState, useEffect } from "react";
import UserModel from "../models/UserModel";
import { logout } from "../config";
import { getMyQuizes } from "../requests/quiz";
import QuizModel from "../models/QuizModel";

interface UserLoggedViewProps {
  user: UserModel;
}

export default function UserLoggedView(props: UserLoggedViewProps) {
  const { user } = props;
  const [myQuizes, setMyQuizes] = useState<QuizModel[]>([]);

  async function fetchQuizes() {
    try {
      const quizesResponse = await getMyQuizes();

      setMyQuizes(quizesResponse.data.data);
    } catch {}
  }

  useEffect(() => {
    fetchQuizes();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-yellow-500 text-3xl">Olá,</h1>
        <h1 className="text-white text-2xl font-bold">{user.username}</h1>
      </div>

      <div className="flex font-bold gap-3 m-auto">
        <div className="bg-slate-500 p-4">
          <p className="text-white">Quiz Criados</p>
          <p className="text-lg text-red-200">{myQuizes.length}</p>
        </div>

        <div className="bg-slate-500 p-4">
          <p className="text-white">Quiz Criados</p>
          <p className="text-lg text-red-200">{myQuizes.length}</p>
        </div>
      </div>

      <div>
        {myQuizes.map((quiz: QuizModel) => (
          <h1>{quiz.description}</h1>
        ))}
      </div>

      <button
        type="button"
        className="w-1/2 m-auto text-center rounded-md p-2 md:p-6 text-lg font-bold bg-red-500"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
