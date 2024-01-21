// Authentication.tsx

export default async function AuthenticationComponent() {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("customToken") || "");

    console.log(token);

    const response = await fetch("https://hostel-complaint-website.onrender.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ userToken: token.token }),
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



