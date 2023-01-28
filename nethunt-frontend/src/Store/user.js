import { createContext } from "react";
import jwt_decode from "jwt-decode";
import { serverHost } from '../utils/server';

let user = {
    userid:null,
}
async function handleSubmit(event)  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get('email'),
      password: data.get('password'),
    };
    fetch(serverHost + "/user/auth/token",{
      method:"POST",
      headers:{'content-type': 'application/json'},
      body:JSON.stringify(body)
    }).then(async (res) => {
      const token = await res.json().then(response=>{
        // console.log(response)
        return response
      }).catch(err=>{
        console.error(err)
      })
      return {token,data:jwt_decode(token.access)}
    }).catch((err) => {
      console.log(err);
    })
  };
  export const userContext = createContext({handleSubmit:handleSubmit,user:user})

  export const UserContextProvider = ({children})=>{
    
    return <userContext.Provider value={{handleSubmit:handleSubmit,user:user}}>
        {children}
    </userContext.Provider>
}