import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { serverHost } from '../utils/server';
export const userContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    let response = await fetch(serverHost + "/user/auth/token", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    let data = await response.json()
    setUserId(jwt_decode(data.access).user_id)
    setToken(data)
    return { token: data, data: jwt_decode(data.access) }
  };
  return <userContext.Provider value={{ handleSubmit: handleSubmit, }}>
    {children}
  </userContext.Provider>
}