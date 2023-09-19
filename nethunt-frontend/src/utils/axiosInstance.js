import jwtDecode from "jwt-decode";
import dayjs from "dayjs"
import axios from "axios"

// const baseUrl = "https://api.nethunt.candidate.psglogin.in/api"
const baseUrl = "https://api.nethunt.alumni.psglogin.in/api"
// const baseUrl = "http://127.0.0.1:8000/api"
let authToken = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null
const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${String(authToken?.access)}`,
    },
});
apiInstance.interceptors.request.use(
    async (req) => {
        if (!authToken) {
            // console.log("Intercetors")
            authToken = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null
            req.headers.Authorization = `Bearer ${String(authToken?.access)}`
            return req
        }
        const usr = jwtDecode(authToken.access)
        const isExpired = dayjs.unix(usr.exp).diff(dayjs()) < 1
        // console.log(`Expired ${isExpired}`)
        if(!isExpired){
            return req
        }else{
            const response = await axios.post(`${baseUrl}/user/auth/refresh`,{
                refresh : authToken.refresh
            })
            localStorage.setItem("authToken",JSON.stringify(response.data))
            req.headers.Authorization = `Bearer ${String(response?.data?.access)}`
            return req
        }
    }
)
export default apiInstance