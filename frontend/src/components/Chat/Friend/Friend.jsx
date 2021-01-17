import React from "react";

import { useSelector } from "react-redux";

import { userStatus } from "../../../utils/helpers";

import "./Friend.scss";

const Friend = ({ chat, click }) => {
  const currentChat = useSelector((state) => state.chatReducer.currentChat);

  const isChatOpened = () => {
    return currentChat.id === chat.id ? "opened" : "";
  };

  const lastMessage = () => {
    if (chat.Messages.length === 0) return "";

    const message = chat.Messages[chat.Messages.length - 1];
    return message.type === "image" ? "image uploaded" : message.message;
  };

  return (
    <div className={`friend-list ${isChatOpened()}`} onClick={click}>
      <div>
        <img
          src={chat.Users[0].avatar}
          width="40"
          height="40"
          alt="user avatar"
        />
        <div className="frined-info">
          <h4 className="m-0">{`${chat.Users[0].firstName} ${chat.Users[0].lastName}`}</h4>
          <h5 className="m-0">{lastMessage()}</h5>
        </div>
      </div>
      <div className="friend-status">
        <span className={`online-status ${userStatus(chat.Users[0])}`}></span>
      </div>
    </div>
  );
};

export default Friend;
