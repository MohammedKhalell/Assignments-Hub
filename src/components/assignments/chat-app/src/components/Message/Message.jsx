import React from "react";
import "./Message.css";

const Message = ({ message }) => {
    const isSenderMe = message.sender === "me"; 

    return (
        <div className={isSenderMe ? "message me" : "message user"}>
            <p>{message.text}</p>
            <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
            </span>
        </div>
    );
};

export default Message;
