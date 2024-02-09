'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AuthProvider = ({children}: ProtectedRouteProps) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
     });
    
    axios.defaults.headers.common['Authorization'] = auth?.token;
    
    useEffect(()=>{
       const token = localStorage.getItem('customToken');
       if(token){
            setAuth((auth)=> ({
            ...auth,
            token: token
            }));
       }
    },[]);

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};