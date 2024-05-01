"use client";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { RSC_ACTION_CLIENT_WRAPPER_ALIAS } from "next/dist/lib/constants";
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id:3,
    username: "ds.vasudev",
    name: "vasudev darse shikari",
    email: "vasudevds1729@gmail.com",
    password: "$2b$10$Nqau0ZcMqNO3egKzfok5yeWuBlf79gD9ecnqqEyiPo8wzhGfBOKGe",
    createdAt: "2024-05-01T14:46:45.000Z",
    updatedAt: "2024-05-01T14:46:45.000Z",
    deletedAt: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId,setChatId]=useState("");

  const [chat,setChat]=useState({
    name:"",
    userOne:"",
    userTwo:"",
    lastMessageId:0
  })

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setLoading(false);
        window.location.href = "/chat";
      }
    } catch (error) {
      throw new Error("Invalid Credentials");
    }
  };

  const register = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        values
      );
      if (response.status === 200) {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error while registering");
    }
  };

  const getUserByToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/user/by/token",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = response.data.data;
        setUser((prev) => {
          return data;
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Invalid credentials");
    }
  };

  

  useEffect(() => {
    getUserByToken();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register,chatId,setChatId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
