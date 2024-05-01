"use client"

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    // Register user with the server
    socket.emit("register", 2); // Replace with user's ID

    socket.on("privateMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const to = 2; 
    socket.emit("privateMessage", { to, message });
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "senderUserId", message },
    ]); 
    setMessage("");
  };

  return (
    <div>
      <div>
        <h2 onClick={()=>{}}>Sender</h2>
        <ul>
          {messages.map((msg, index) =>
            msg.from === "senderUserId" ? (
              <li key={index}>{`You: ${msg.message}`}</li>
            ) : null
          )}
        </ul>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Receiver</h2>
        <ul>
          {messages.map((msg, index) =>
            msg.from === "receiverUserId" ? (
              <li key={index}>{`Receiver: ${msg.message}`}</li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoom;
