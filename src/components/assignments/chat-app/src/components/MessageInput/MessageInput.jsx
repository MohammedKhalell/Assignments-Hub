// MessageInput.js
import React from "react";
import "./MessageInput.css";

const MessageInput = ({ messageInput, setMessageInput, handleSendMessage }) => {
  return (
    <div className="message-input">
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message..."
        onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
