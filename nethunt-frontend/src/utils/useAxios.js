import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { userContext } from "../Store/user";
const baseUrl = "http://127.0.0.1:8000/api"

const useAxios = ()=>{
    const {token,setUserId,setToken} = useContext(userContext)
    const apiInstance = axios.create({
        baseURL:baseUrl,
        headers:{
            Authorization:`Bearer ${token?.access}`
        }
    })

    apiInstance.interceptors.request.use(
        async (req) => {
            const usr = jwtDecode(token.access)
            const isExpired = dayjs.unix(usr.exp).diff(dayjs()) < 1
            console.log(`Expired ${isExpired}`)
            if(!isExpired){
                return req
            }else{
                const response = await axios.post(`${baseUrl}/user/auth/refresh`,{
                    refresh : token.refresh
                })
                localStorage.setItem("authToken",JSON.stringify(response.data))
                setToken(response.data)
                setUserId(jwtDecode(response.data.access).user_id)
                req.headers.Authorization = `Bearer ${String(response?.data?.access)}`
                return req
            }
        }
    )
    return apiInstance
}
export default useAxios