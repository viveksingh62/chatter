import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Vocal from "../assets/chatlogo.png";
import "../styles/work-chat-styles.css";
import barrier from "../assets/Breaking barriers-bro.png";
import anim from "../assets/work-chat-not-css.svg";
import multi from "../assets/Learning languages-rafiki.png";
import listen from "../assets/Online world-pana.png";
import online from "../assets/Learning languages-bro.png";
function Googlelogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const responeGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        // const { name, email, image } = result.data.user;
        // const token = result.data.token;
        login(result.data);
        // const obj = { name, email, image, token };

        // localStorage.setItem("user-info", JSON.stringify(result.data));
        // console.log(token);
        // console.log(result.data.user);
        navigate("/chatpage", { replace: true });
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT VISUAL */}
      <div className="hidden md:flex items-center justify-center bg-gray-300">
        <img
          src={anim}
          alt="Chat illustration"
          className="w-full max-w-[420px] xl:max-w-[640px] animate-float"
        />
      </div>

      {/* RIGHT LOGIN */}
      <div className="relative flex items-center justify-center bg-gray-50 overflow-hidden">
        {/* MOBILE ONLY IMAGE */}
        <img
          src={listen}
          alt="listen"
          className="block md:hidden absolute top-6 w-40 opacity-100"
        />

        {/* DESKTOP DECORATIVE IMAGES */}
        <img
          src={barrier}
          alt="barrier"
          className="hidden md:block absolute top-16 left-12 w-40 opacity-70"
        />

        <img
          src={multi}
          alt="multi"
          className="hidden md:block absolute bottom-16 right-14 w-40 opacity-70"
        />

        <img
          src={online}
          alt="online"
          className="hidden md:block absolute top-24 right-20 w-30 opacity-90"
        />

        <img
          src={listen}
          alt="listen"
          className="hidden md:block absolute bottom-24 left-20 w-40 opacity-90"
        />

        {/* LOGIN CARD */}
        <div
          className="
    relative
    w-[90%]
    max-w-sm
    rounded-2xl
    p-8
    text-center
    bg-white/90
    backdrop-blur-xl
    shadow-[0_20px_40px_rgba(0,0,0,0.08)]
    z-10
  "
        >
          {/* Logo */}
          <img src={Vocal} alt="Vocal" className="w-20 mx-auto mb-4" />

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Talk Beyond Barriers
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 mb-8 text-sm">
            Sign in to continue your conversation
          </p>

          {/* Google Button */}
          <button
            onClick={googlelogin}
            className="
      w-full
      flex
      items-center
      justify-center
      gap-3
      rounded-full
      bg-white
      border
      border-gray-200
      py-3
      px-4
      text-sm
      font-medium
      text-gray-700
      shadow-sm
      hover:shadow-md
      hover:bg-gray-50
      transition
    "
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Footer text */}
          <p className="mt-6 text-xs text-gray-400">
            Secure login ·  Free forever .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Googlelogin;
