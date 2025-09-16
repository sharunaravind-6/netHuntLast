import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";
// Import the centralized API URL
import { serverHost } from "./server";

let authToken = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null;
const apiInstance = axios.create({
    baseURL: serverHost, // Use the imported URL
    headers: {
        Authorization: `Bearer ${String(authToken?.access)}`,
    },
});

apiInstance.interceptors.request.use(
    async (req) => {
        if (!authToken) {
            authToken = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null;
            req.headers.Authorization = `Bearer ${String(authToken?.access)}`;
            return req;
        }
        const usr = jwtDecode(authToken.access);
        const isExpired = dayjs.unix(usr.exp).diff(dayjs()) < 1;
        if (!isExpired) {
            return req;
        } else {
            // Use serverHost for the refresh call as well
            const response = await axios.post(`${serverHost}/user/auth/refresh`, {
                refresh: authToken.refresh
            });
            localStorage.setItem("authToken", JSON.stringify(response.data));
            req.headers.Authorization = `Bearer ${String(response?.data?.access)}`;
            return req;
        }
    }
);
export default apiInstance;
