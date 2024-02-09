// Authentication.tsx
import axios from 'axios';
export default async function AuthenticationComponent() {
  //const token = JSON.parse(localStorage.getItem("customToken") || "");
  const token = localStorage.getItem("customeToken") || "";


  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/authenticate`, {
    userToken: token
  },{
    validateStatus: (status) => status>= 200 && status<=500
  });

  return response.data;
}



