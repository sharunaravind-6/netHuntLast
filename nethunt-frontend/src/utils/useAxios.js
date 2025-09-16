import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { userContext } from "../Store/user";
// Import the centralized API URL
import { serverHost } from "./server";

const useAxios = () => {
    const { token, setUserDetails, setToken } = useContext(userContext);
    const apiInstance = axios.create({
        baseURL: serverHost, // Use the imported URL
        headers: {
            Authorization: `Bearer ${token?.access}`
        }
    });

    apiInstance.interceptors.request.use(
        async (req) => {
            const usr = jwtDecode(token?.access);
            const isExpired = dayjs.unix(usr.exp).diff(dayjs()) < 1;
            if (!isExpired) {
                return req;
            } else {
                // Use serverHost for the refresh call as well
                const response = await axios.post(`${serverHost}/user/auth/refresh`, {
                    refresh: token.refresh
                });
                localStorage.setItem("authToken", JSON.stringify(response.data));
                setToken(response.data);
                setUserDetails(jwtDecode(response.data.access).user);
                req.headers.Authorization = `Bearer ${String(response?.data?.access)}`;
                return req;
            }
        }
    );
    return apiInstance;
};
export default useAxios;
