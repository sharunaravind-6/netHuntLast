import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const userContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => { return localStorage.getItem("authToken") ? jwt_decode(JSON.parse(localStorage.getItem("authToken")).access).user : null })
  const [token, setToken] = useState(() => { return localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  function logout() {
    setUserDetails(null);
    setToken(null);
    localStorage.removeItem("authToken")
    navigate("/login")
  }

 
  function setTokenReuse(data) {
    setUserDetails(jwt_decode(data.access).user);
    localStorage.setItem("authToken", JSON.stringify(data));
    setToken(data);
  }
  useEffect((() => {
    if(token){
      setUserDetails(jwt_decode(token.access).user)
    }
    setLoading(false)
  }), [token, loading,]);




  return <userContext.Provider value={{  userDetails, token ,setToken,setUserDetails,setTokenReuse,logout}}>
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