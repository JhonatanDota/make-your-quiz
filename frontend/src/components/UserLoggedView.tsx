import UserModel from "../models/UserModel";
import { logout } from "../config";

interface UserLoggedViewProps {
  user: UserModel;
}

export default function UserLoggedView(props: UserLoggedViewProps) {
  const { user } = props;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-yellow-500 text-3xl">Olá,</h1>
        <h1 className="text-white text-2xl font-bold">{user.username}</h1>
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
