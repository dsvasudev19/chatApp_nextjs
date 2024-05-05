"use client";

import Bubble from "./../bubble";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "@/app/authContext";
import axios from "axios";
const Messages = () => {
    const messagesEndRef = useRef(null);
  const { user, chatId,socket,receiverId } = useAuth();
  const [messages, setMessages] = useState([ ]);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    if(socket){
      socket.on("receiveMessage",(data)=>{
        setMessages({...messages,data})
      })
    }
  })

  const getMessagesOfChat = async () => {
    try {
        const response=await axios.get(`http://localhost:3000/api/message/${chatId}`);
        if(response.status===200){
            const realMessages=response.data.data;
            setMessages((prev)=>{
                return realMessages
            })
        }
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3000/api/message/`, {
      chatId,
      senderId: user.id,
      message,
    });

    if (res.status === 200) {
      socket.emit("privateMessage", {  message:res.data.data,to:receiverId });
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...res.data.data },
      ]);
      setMessage((prev) => {
        return "";
      });
    }
  };

  useEffect(()=>{
    getMessagesOfChat();
  },[chatId])
  useEffect(()=>{
    setTimeout(()=>{
        getMessagesOfChat();
    },10)
  })

  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow h-full flex flex-col">
      {chatId ? (
        <>
          <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
            <div className="flex p-2 align-middle items-center">
              <div className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <div className="border rounded-full border-white p-1/2">
                <img
                  className="w-14 h-14 rounded-full"
                  src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                  alt="avatar"
                />
              </div>
              <div className="flex-grow p-2">
                <div className="text-md text-gray-50 font-semibold">
                  Rey Jhon A. Baquirin{" "}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-200 rounded-full"></div>
                  <div className="text-xs text-gray-50 ml-1">Online</div>
                </div>
              </div>
              <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
            { messages.length && messages?.map((item,index) => {
              if (item.senderId === user.id) {
                return (
                  <div className="flex justify-end my-2" key={index}>
                    <div className="flex items-end w-auto bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
                      <div className="p-2">
                        <div className="text-gray-200">{item.message}</div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex items-end w-3/4" key={index}>
                    <div className="p-3 bg-purple-200 dark:bg-gray-800 rounded-2xl m-1 rounded-bl-none sm:w-3/4 md:w-3/6">
                      <div className="text-gray-700 dark:text-gray-200">
                        {item.message}
                      </div>
                      <div className="text-xs text-gray-400">1 day ago</div>
                    </div>
                  </div>
                );
              }
            })}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="p-2 text-gray-600 dark:text-gray-200 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="search-chat flex flex-grow">
                <form
                  className="search-chat flex flex-grow pb-2"
                  onSubmit={sendMessage}
                >
                  <input
                    className="input text-gray-700 dark:text-gray-200 text-lg p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md"
                    type="text"
                    value={message}
                    placeholder="Type your message ..."
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                    <button type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center align-center text-center m-auto">
            <h1 className="text-4xl">Select a Chat to Continue</h1>
        </div>
      )}
    </div>
  );
};

export default Messages;
