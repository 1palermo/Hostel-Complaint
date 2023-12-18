// Authentication.tsx

export default async function AuthenticationComponent() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("customToken");

    console.log(token);

    const response = await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/authenticate", {
      method: "POST",
      body: JSON.stringify({ userToken: token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    return res;
  }
  else{
    return {valid:false, Id:''};
  }
}



