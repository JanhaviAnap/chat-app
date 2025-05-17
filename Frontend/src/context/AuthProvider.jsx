import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  //const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp");
  //const initialUserState = localStorage.getItem("ChatApp");
  // parse the user data and storing in state.
  //const [authUser, setAuthUser] = useState(
  //  initialUserState ? JSON.parse(initialUserState) : undefined
  //);

const [authUser, setAuthUser] = useState(undefined);

  useEffect(() => {
    // On initial load, check localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("ChatApp");

    if (token && user) {
      setAuthUser({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
