// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

import "bootstrap/dist/css/bootstrap.min.css"
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
import axios from "axios"
import Echo from "laravel-echo"

import App from "./App"
import Pusher from "pusher-js"
import { api } from "@/services/api"


Pusher.logToConsole = true

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.get(window.baseHostUrl + "/sanctum/csrf-cookie")

dayjs.extend(relativeTime)
dayjs.locale("pt-br")
window.dayjs = dayjs
window.baseHostUrl = import.meta.env.VITE_BASE_SERVER_URL

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        api.post('/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name
        })
        .then(response => {
          callback(false, response.data)
        })
        .catch(error => {
          callback(true, error)
        })
      }
    }
  }
})

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
