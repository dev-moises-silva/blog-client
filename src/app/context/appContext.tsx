import { createContext, ReactNode, useState } from "react"

import { User } from "@/types/User"

const appContextDefaultValues = {
  user: {} as User,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: User) => {}
}

const AppContext = createContext(appContextDefaultValues)

type Props = {
  children: ReactNode
}

function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User)

  return (
    <AppContext.Provider value={{user, setUser}}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppContextProvider}