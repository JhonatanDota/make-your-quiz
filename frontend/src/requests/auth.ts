import axios from "axios";
import { API_BASE_URL } from "../config";
import { HEADER } from "../config";

const LOGIN_URL = `${API_BASE_URL}login/`;

export async function login(username: string, password: string) {
    const response = await axios.post(LOGIN_URL, {username, password},{
      headers: HEADER,
    });

    return response;
  }
  