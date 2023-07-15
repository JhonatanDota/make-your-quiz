import { Navigate } from "react-router-dom";
import UserModel from "./models/UserModel";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
};

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getUser(): UserModel | null {
  let user = localStorage.getItem("user");

  if (user) {
    const userModel: UserModel = JSON.parse(user);
    return userModel;
  }

  return null;
}

export function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  window.location.replace("/user")
}

// export function authCheck(component: any) {
//   return getToken() ? component : <Navigate to="/" />;
// }

// export function isLogged() {
//   return getToken() ? <Navigate to="/dashboard" /> : <Login />;
// }

