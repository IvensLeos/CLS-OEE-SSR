import { createContext, useContext, useState, useMemo } from "react"

const AppContext = createContext()

export const ContextProvider = (props) => {
  const [Machine, SetMachine] = useState("MOM-40")

  const Value = useMemo(() => {
    return ({ Machine, SetMachine })
  }, [Machine])

  return <AppContext.Provider value={Value} {...props} />
}

export const useAppContext = () => {
  const Context = useContext(AppContext)

  if (!Context) throw new Error("Param Should Be Inside AppContext Provider.")

  return Context
}