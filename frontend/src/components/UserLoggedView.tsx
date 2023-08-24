import { useState, useEffect } from "react";
import UserModel from "../models/UserModel";
import { logout } from "../config";
import { QuizModel } from "../models/QuizModel";
import {
  MyAnalyticsModel,
  MY_ANALYTICS_DEFAULT_DATA,
} from "../models/MyAnalyticsModel";
import { getMyAnalyticts } from "../requests/analytics";

interface UserLoggedViewProps {
  user: UserModel;
}

export default function UserLoggedView(props: UserLoggedViewProps) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myAnalytics, setMyAnalytics] = useState<MyAnalyticsModel>(
    MY_ANALYTICS_DEFAULT_DATA
  );

  async function getMyAnalytics() {
    try {
      const myAnalyticsResponse = await getMyAnalyticts();

      setMyAnalytics(myAnalyticsResponse.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMyAnalytics();
  }, []);

  function analyticSkeleton() {
    return (
      <div className="m-auto w-10 rounded bg-blue-900/75 animate-pulse">
        <div className="h-6"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 font-bold">
        <h1 className="text-yellow-500 text-3xl">Olá,</h1>
        <h1 className="text-white text-2xl">{user.username}</h1>
      </div>

      <div className="grid grid-cols-2 gap-2 font-bold">
        <div className="flex flex-col gap-2 bg-blue-950 p-4 rounded-lg text-lg">
          <p className="text-slate-100">Criados</p>
          {
            isLoading ? analyticSkeleton() : <p className="text-red-200">{myAnalytics.maded}</p>
          }
        </div>

        <div className="flex flex-col gap-2 bg-blue-950 p-4 rounded-lg text-lg">
          <p className="text-slate-100">Respondidos</p>
          {
            isLoading ? analyticSkeleton() : <p className="text-red-200">{myAnalytics.answered}</p>
          }
        </div>
      </div>

      <button
        type="button"
        className="w-1/2 m-auto text-center rounded-md p-2 md:p-6 text-lg font-bold bg-red-500"
        onClick={logout}
      >
        Sair
      </button>
    </div>
  );
}
