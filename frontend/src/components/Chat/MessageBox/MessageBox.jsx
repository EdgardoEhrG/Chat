import React from "react";

import { useSelector } from "react-redux";

import Message from "../Message/Message";

import "./MessageBox.scss";

const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div id="msg-box">
      {chat.Message.map((message, index) => {
        return (
          <Message
            user={user}
            key={message.id}
            chat={chat}
            message={message}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
