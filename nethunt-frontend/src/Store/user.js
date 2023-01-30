import { createContext } from "react";
import jwt_decode from "jwt-decode";
import { serverHost } from '../utils/server';

let user = {
    userid:null,
}
async function handleSubmit(event)  {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    let response = await fetch(serverHost + "/user/auth/token",{
      method:"POST",
      headers:{'content-type': 'application/json'},
      body:JSON.stringify(body)
    })
    let data = await response.json()
    return {token:data,data:jwt_decode(data.access)}
  };
  export const userContext = createContext({handleSubmit:handleSubmit,user:user})

  export const UserContextProvider = ({children})=>{
    
    return <userContext.Provider value={{handleSubmit:handleSubmit,user:user}}>
        {children}
    </userContext.Provider>
}