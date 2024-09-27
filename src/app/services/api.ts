import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

export const api = axios.create({
  baseURL
})