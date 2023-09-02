import { useState, useEffect } from "react";
import UserModel from "../models/UserModel";
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
    <div className="flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-2 md:gap-6 font-bold">
        <h1 className="text-yellow-500 text-3xl md:text-6xl">Olá,</h1>
        <h1 className="text-white text-2xl md:text-5xl">{user.username}</h1>
      </div>

      <div className="grid grid-cols-2 md:flex md:justify-evenly gap-2 font-bold">
        <button className="flex flex-col items-center md:w-1/4 gap-2 bg-blue-950 p-4 md:p-12 rounded-lg text-lg">
          <p className="text-md md:text-3xl text-slate-100">Criados</p>
          {isLoading ? (
            analyticSkeleton()
          ) : (
            <p className="text-md md:text-3xl text-red-200">
              {myAnalytics.maded}
            </p>
          )}
        </button>

        <button className="flex flex-col items-center md:w-1/4 gap-2 bg-blue-950 p-4 md:p-12 rounded-lg text-lg">
          <p className="text-md md:text-3xl text-slate-100">Respondidos</p>
          {isLoading ? (
            analyticSkeleton()
          ) : (
            <p className="text-md md:text-3xl text-red-200">
              {myAnalytics.answered}
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
