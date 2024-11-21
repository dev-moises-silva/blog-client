import dayjs from "dayjs"
import Echo from "laravel-echo"
import Pusher from "pusher-js"

declare global {
  interface Window {
    dayjs: typeof dayjs
    baseHostUrl: string
    Echo: Echo
  }
}