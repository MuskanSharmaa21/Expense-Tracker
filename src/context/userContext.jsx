import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Make sure path is correct
import { API_PATH } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // ✅ Auto fetch user if token is present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      axiosInstance
        .get(API_PATH.AUTH.GET_USER_INFO)
        .then((res) => {
          setUser(res.data.user); // Adjust based on your response
        })
        .catch((err) => {
          console.error("Auto-login failed:", err);
          clearUser();
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
