import { createContext, useState } from "react";
import { getToken, getUser } from "../config";
import UserModel from "../models/UserModel";

interface UserContextInterface {
  user: UserModel | null;
  token: string | null;
}

const DEFAULT_VALUE: UserContextInterface = {
  user: null,
  token: null,
};

export const UserContext = createContext<UserContextInterface>(DEFAULT_VALUE);

export function UserProvider(props: any) {
  const [user] = useState<UserModel | null>(getUser());
  const [token] = useState<string | null>(getToken());

  return (
    <UserContext.Provider value={{ user, token }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default { UserContext, UserProvider };
