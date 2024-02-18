'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './auth';
import { getReport } from '../actions';

const AdminContext = createContext<any>(null);

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AdminProvider = ({children}: ProtectedRouteProps) => {
    const [report, setReport] = useState([]);
    const [auth, setAuth] = useAuth() as any;

    useEffect(()=>{
        async function get(){
          const apiResponse = await getReport(auth.token, auth.user.category);
          setReport(apiResponse);
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