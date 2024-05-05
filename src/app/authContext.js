"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { axiosInstance } from "./../../axiosInstance";
const AuthContext = createContext(undefined);
import io from 'socket.io-client'
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId,setChatId]=useState("");
  const [receiverId,setReceiverId]=useState("");
  const [userOne,setUserOne]=useState("");
  const [userTwo,setUserTwo]=useState("")
  const [socket,setSocket]=useState();
  const [chat,setChat]=useState({
    name:"",
    userOne:"",
    userTwo:"",
    lastMessageId:0
  })

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/api/auth/login",
        { email, password }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setLoading(false);
        localStorage.setItem("token",response.data.data.token)
        window.location.href = "/chat";
      }
    } catch (error) {
      throw new Error("Invalid Credentials");
    }
  };

  const register = async (values) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/register",
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
      const response = await axiosInstance.get(
        "/api/auth/user/by/token",
        
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

  const instantiateSocket=async()=>{
      try {
        const socket=new io("http://localhost:3000")
        setSocket(socket)
      } catch (error) {
        console.log(error);
      }
  }
  const setReceiver=()=>{
    console.log("setting receiver")
    if(user.id===userOne){
      setReceiverId((prev)=>{
        return userTwo
      })
    }else{
      setReceiverId((prev)=>{
        return userOne
      })
    }
  }

  useEffect(() => {
    getUserByToken();
  }, []);
  useEffect(()=>{
    instantiateSocket()
  },[])

  useEffect(()=>{
    setReceiver()
  },[chatId])
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register,chatId,setChatId ,socket,setSocket,userOne,setUserOne,userTwo,setUserTwo,receiverId}}>
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
