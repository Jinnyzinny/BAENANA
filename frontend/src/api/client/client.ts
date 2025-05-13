import { API_BASE } from "@env";
import axios from "axios";

export const client = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
