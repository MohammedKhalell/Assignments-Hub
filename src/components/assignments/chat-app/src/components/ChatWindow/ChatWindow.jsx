import React, { useRef, useEffect } from "react";
import "./ChatWindow.css";
import Message from "../Message/Message";

const ChatWindow = ({ messages, typingIndicator,activeUser}) => {
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages, typingIndicator]);
    
  return (
    <div className="chat-window">
      <h2>Chat with {activeUser}</h2>
      <div className="message-list">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))} 
      {typingIndicator && <div className="typing-indicator">{typingIndicator}</div>}
      <div ref={chatEndRef} />
    </div> 
    </div>
  );
};

export default ChatWindow;
