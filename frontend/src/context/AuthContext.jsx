import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user-info");

    if (stored) {
      const parsed = JSON.parse(stored);
      const decoded = jwtDecode(parsed.token);

      setUser({
        ...parsed.user,
        _id: decoded._id,
        token: parsed.token,
      });
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    const decoded = jwtDecode(data.token);

    const finalUser = {
      ...data.user,
      _id: decoded._id,
      token: data.token,
    };

    localStorage.setItem("user-info", JSON.stringify(data));
    setUser(finalUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
