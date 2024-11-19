import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

import App from "./App"

import "bootstrap/dist/css/bootstrap.min.css"
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

dayjs.extend(relativeTime)
dayjs.locale("pt-br")
window.dayjs = dayjs
window.baseHostUrl = import.meta.env.VITE_BASE_HOST_URL

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
