import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Googlelogin from "./pages/Googlelogin";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Refreshhandler from "./utils/Refreshhandler";
import Chat from "./pages/Chat.jsx";

import Chatpage from "./pages/Chatpage.jsx";
function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="972235488284-nuuuld2gesg2182eq4sv24pk86tf54i1.apps.googleusercontent.com">
        <Googlelogin />
      </GoogleOAuthProvider>
    );
  };
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <Refreshhandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/chat" element={<Chat />} />

        <Route
          path="/chatpage"
          element={<PrivateRoute element={<Chatpage />} />}
        />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
