import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { serverHost } from '../utils/server';
export const userContext = createContext()

export const UserContextProvider = ({ children }) => {
  const oldToken = localStorage.getItem("authToken")
  // console.log(oldToken)
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()
  const [loading, setLoading] = useState(true)
  if (oldToken) {
    console.log(oldToken)
    const temp = JSON.parse(oldToken)
    setToken(temp)
    setUserId(jwt_decode(temp).access)
  }

  async function updateToken() {

    console.log("Update Function")
    let response = await fetch(serverHost + "/user/auth/refresh", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        // 'Authorization': String("Bearer") + token.access
      },
      body: JSON.stringify({ "refresh": token.refresh })
    })
    if (response.status === 200) {
      let data = await response.json()
      console.log(data);
    }else{
      setUserId(null);
      setToken(null);
      localStorage.removeItem("authToken")
    }
  }
  useEffect((() => {
    if (loading) {
      updateToken()
    }
    let interval = setInterval(
      () => {
        updateToken()
      },
      4 * 1000
    )
    if (loading) {
      setLoading(false)
    }
    return () => clearInterval(interval)
  }), [token, loading]);

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
    if (response.status === 200) {
      let data = await response.json()
      setUserId(jwt_decode(data.access).user_id);
      localStorage.setItem("authToken", JSON.stringify(data));
      setToken(data);
      console.log(typeof data)
      return { token: data, data: jwt_decode(data.access) }
    }
  };



  return <userContext.Provider value={{ handleSubmit: handleSubmit, user: userId }}>
    {children}
  </userContext.Provider>
}