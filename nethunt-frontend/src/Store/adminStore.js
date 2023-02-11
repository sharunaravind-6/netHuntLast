import { createContext, useState } from "react";
import useAxios from "../utils/useAxios";
export const AdminContext = createContext()
export default function AdminProvider({children}){
    const [colleges,setColleges] = useState([])
    const [usrs,setUsers] = useState([])
    const [config,setConfig] = useState(null)
    const api = useAxios()
    async function fetchCollege() {
        let response = await api.get( "/user/college")
        if (response.data) {
            let collegeZ = await response.data
            console.log(collegeZ)
            setColleges(() => { return collegeZ })
            return collegeZ
        }
    }

    async function fetchUsers() {
        let response = await api.get( "/user/view")
        if (response.data) {
            let users = await response.data
            console.log(users)
            setUsers(() => { return users })
            return users
        }
    }
     return <AdminContext.Provider value={{usrs,colleges,setUsers,setColleges,fetchCollege,fetchUsers,config,setConfig}}>
        {children}
     </AdminContext.Provider>
}