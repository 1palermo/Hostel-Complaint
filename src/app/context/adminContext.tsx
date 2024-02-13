'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './auth';

const AdminContext = createContext<any>(null);

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AdminProvider = ({children}: ProtectedRouteProps) => {
    const [report, setReport] = useState([]);
    const [auth, setAuth] = useAuth() as any;

    useEffect(()=>{
        async function get(){
            const apiResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_URL}/report`,{
                token: auth.token,
                cat: auth.user.category
              },
              {
                validateStatus: (status) => status>= 200 && status<=500
              }
            );
            setReport(apiResponse.data);
           // console.log(apiResponse.data);
        }
        if(auth.user) get();
    },[auth.token, auth.user]);

    return(
        <AdminContext.Provider value={[report, setReport]}>
            {children}
        </AdminContext.Provider>
    )
}

const useAdmin = () => useContext(AdminContext);

export {useAdmin, AdminProvider};