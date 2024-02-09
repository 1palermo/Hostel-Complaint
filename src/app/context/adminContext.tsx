'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './auth';

const AdminContext = createContext();

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AdminProvider = ({children}: ProtectedRouteProps) => {
    const [report, setReport] = useState([]);
    const [auth, setAuth] = useAuth();

    useEffect(()=>{
        async function get(){
            const apiResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${auth.user.category}`,
              {
                validateStatus: (status) => status>= 200 && status<=500
              }
            );
            setReport(apiResponse.data);
           // console.log(apiResponse.data);
        }
        get();
    },[auth?.token]);

    return(
        <AdminContext.Provider value={[report, setReport]}>
            {children}
        </AdminContext.Provider>
    )
}

const useAdmin = () => useContext(AdminContext);

export {useAdmin, AdminProvider};