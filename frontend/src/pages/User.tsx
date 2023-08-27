import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import UserLoggedView from "../components/UserLoggedView";

export default function User() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8 text-center">
      {user ? (
        <div className="mt-[5%]">
          <UserLoggedView user={user} />
        </div>
      ) : (
        <div className="w-full mt-24 md:mt-36 m-auto flex flex-col gap-12">
          <NavLink to="/login">
            <button
              type="button"
              className="text-center w-full md:w-1/4 rounded-md p-4 md:p-6 text-2xl md:text-3xl font-bold bg-green-500"
            >
              Login
            </button>
          </NavLink>

          <NavLink to="/login">
            <button
              type="button"
              className="text-center w-full md:w-1/4 rounded-md p-4 md:p-6 text-2xl md:text-3xl font-bold bg-purple-400"
            >
              Criar Conta
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
