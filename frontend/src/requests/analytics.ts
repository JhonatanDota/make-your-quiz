import axios from "axios";
import { API_BASE_URL } from "../config";
import { HEADER } from "../config";

const MY_ANALYTICS = `${API_BASE_URL}my-analytics/`;

export async function getMyAnalyticts() {
    const response = await axios.get(MY_ANALYTICS, {
      headers: HEADER,
    });

    return response;
  }
  