import { createContext } from "react";

export const userContext = createContext()
export const userContextProvider = ({children})=>{
    return <userContext.Provider>
        {children}
    </userContext.Provider>
}