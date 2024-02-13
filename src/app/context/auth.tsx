'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext<any>(null);

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AuthProvider = ({children}: ProtectedRouteProps) => {
    console.log("auth");
    const [auth, setAuth] = useState({
        user: null,
        token: '',
     });
    
    axios.defaults.headers.common['Authorization'] = auth.token;
    
    useEffect(()=>{
       const token = localStorage.getItem('customToken') || '';
       const data = token === ''? {} : JSON.parse(token);
       if(token){
            console.log(token, data);
            setAuth(data);
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