import React from "react";

import { useSelector } from "react-redux";

import Navbar from "../Navbar/Navbar";

import "./Chat.scss";

const Chat = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap"></div>
    </div>
  );
};

export default Chat;
