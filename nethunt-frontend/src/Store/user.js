import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { serverHost } from '../utils/server';
import { useNavigate } from "react-router-dom";
export const userContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => { return localStorage.getItem("authToken") ? jwt_decode(JSON.parse(localStorage.getItem("authToken")).access).user_id : null })
  const [token, setToken] = useState(() => { return localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  function logout() {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("authToken")
    navigate("/login")
  }

 
  function setTokenReuse(data) {
    setUserId(jwt_decode(data.access).user_id);
    localStorage.setItem("authToken", JSON.stringify(data));
    setToken(data);
  }
  useEffect((() => {
    if(token){
      setUserId(jwt_decode(token.access).user_id)
    }
    setLoading(false)
  }), [token, loading,]);




  return <userContext.Provider value={{  user: userId, token ,setToken,setUserId,setTokenReuse,logout}}>
    {loading ? null:children}
  </userContext.Provider>
}

 // async function updateToken() {
  //   console.log("Update Function")
  //   let response = await fetch(serverHost + "/user/auth/refresh", {
  //     method: "POST",
  //     headers: {
  //       'content-type': 'application/json',
  //       // 'Authorization': String("Bearer") + token.access
  //     },
  //     body: JSON.stringify({ "refresh": token?.refresh })
  //   })
  //   if (response.status === 200) {
  //     let data = await response.json()
  //     setTokenReuse(data)
  //   } else {
  //     logout()
  //   }
  //   if(loading){
  //     setLoading(false)
  //   }
  // }