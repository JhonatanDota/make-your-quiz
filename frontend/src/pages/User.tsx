import { NavLink } from "react-router-dom";

export default function User() {
  return (
    <div className="mt-32 flex flex-col gap-y-4 md:gap-y-8 text-center">
      <div className="w-2/3 m-auto flex flex-col gap-12">
        <NavLink to="/login">
          <button
            type="button"
            className="w-full text-center rounded-md p-4 md:p-6 text-2xl font-bold bg-green-500"
          >
            Login
          </button>
        </NavLink>

        <button
          type="button"
          className="text-center rounded-md p-4 md:p-6 text-2xl font-bold bg-purple-400"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
}
