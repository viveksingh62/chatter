import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";
function Googlelogin() {
  const navigate = useNavigate();
  const responeGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { name, email, image } = result.data.user;
        const token = result.data.token;
        const obj = { name, email, image, token };

        localStorage.setItem("user-info", JSON.stringify(obj));
        console.log(token);
        console.log(result.data.user);
        navigate("/dashboard");
      }
      console.log(authResult);
    } catch (error) {
      console.log("Error while requestion google code : " + error);
    }
  };

  const googlelogin = useGoogleLogin({
    onSuccess: responeGoogle,
    onError: responeGoogle,
    flow: "auth-code",
  });
  return (
    <div className="App">
      <button onClick={() => googlelogin()}>Login with google</button>
    </div>
  );
}

export default Googlelogin;
