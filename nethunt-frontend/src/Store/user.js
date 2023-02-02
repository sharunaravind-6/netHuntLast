import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { serverHost } from '../utils/server';
import { useNavigation } from "react-router-dom";
export const userContext = createContext()

export const UserContextProvider = ({ children }) => {
  const oldToken = localStorage.getItem("authToken")
  // console.log(oldToken)
  const [userId, setUserId] = useState(oldToken?jwt_decode(JSON.parse(oldToken).access).user_id:null)
  const [token, setToken] = useState(oldToken?JSON.parse(oldToken):null)
  const [loading, setLoading] = useState(true)
  // const navigate = useNavigation()
  function logout() {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("authToken")
    // navigate("/login")
  }
  async function updateToken() {
    if (token == null){
      return
    }
    // console.log("Update Function")
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
      setToken(data)
      setUserId(jwt_decode(data.access).user_id)
      localStorage.setItem("authToken",JSON.stringify(data))
      // console.log(data);
    } else {
      logout()
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
      4 *60* 1000
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
      return { token: data, data: jwt_decode(data.access) }
    } else {
      logout()
    }
  };



  return <userContext.Provider value={{ handleSubmit: handleSubmit, user: userId,token:token }}>
    {children}
  </userContext.Provider>
}