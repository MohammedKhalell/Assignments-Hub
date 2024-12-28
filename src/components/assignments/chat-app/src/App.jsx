// App.js
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import UserList from "./components/UserList/UserList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import MessageInput from "./components/MessageInput/MessageInput";

const users = [
  {
    id: 1,
    name: "Mohammad",
    avatar:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg",
  },
  {
    id: 2,
    name: "Ahmed",
    avatar: "https://avatarfiles.alphacoders.com/715/71560.jpg",
  },
  {
    id: 3,
    name: "Ali",
    avatar:
      "https://r2.erweima.ai/imgcompressed/img/compressed_95f6dc695351dbb5cf511ee473897718.webp",
  },
];

const App = () => {
  const [messageInput, setMessageInput] = useState("");
  const [activeUser, setActiveUser] = useState(users[0]);
  const [typingIndicator, setTypingIndicator] = useState("");
  const chatWindowRef = useRef(null);

  const [chats, setChats] = useState({
    1: [],
    2: [],
    3: [],
  });

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setChats((prevChats) => ({
        ...prevChats,
        [activeUser.id]: [
          ...prevChats[activeUser.id],
          { sender: "me", text: messageInput, timestamp: new Date() },
        ],
      }));
      setMessageInput("");
    }
  };

  useEffect(() => {
    const typingTimeout = setInterval(() => {
      const User = users.find((user) => user.id == activeUser.id);

      setTypingIndicator(`${User.name} is typing...`);

      setTimeout(() => {
        setTypingIndicator(""); 

        const simulatedMessage = {
          sender: User.name.toLowerCase(),
          text: getRandomMessage(), 
          timestamp: new Date(),
        };

        setChats((prevChats) => ({
          ...prevChats,
          [activeUser.id]: [
            ...prevChats[activeUser.id], 
            simulatedMessage, 
          ],
        }));
      }, 2000); 
    }, getRandomInterval()); 

    return () => clearInterval(typingTimeout); 
  }, [activeUser]); 

 
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight; 
    }
  }, [chats]); 
  return (
    <div className="app-containers">
      <UserList
        users={users}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
      />
      <div className="chat-container">
        <ChatWindow
          messages={chats[activeUser.id]}
          typingIndicator={typingIndicator}
          activeUser={activeUser.name}
          ref={chatWindowRef}
        />
        <MessageInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

const getRandomMessage = () => {
  const randomMessages = [
    "Hello!",
    "How's it going?",
    "This app looks great!",
    "React is fun to use!",
    "What's up?",
  ];
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
};

const getRandomInterval = () => Math.random() * (10000 - 5000) + 5000;

export default App;
