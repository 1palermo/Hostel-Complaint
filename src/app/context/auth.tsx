'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext<any>(null);

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AuthProvider = ({children}: ProtectedRouteProps) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
     });
    
    const router = useRouter();
    axios.defaults.headers.common['Authorization'] = auth.token;
    const pathname = usePathname();
    const segments = pathname.split('/');
    const role = segments[1];
    
    useEffect(()=>{
       const token = localStorage.getItem('customToken') || '';
       const data = token === ''? {} : JSON.parse(token);
       if(token === '' && role!=="auth"){
          router.push('/');
       }
       else{
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