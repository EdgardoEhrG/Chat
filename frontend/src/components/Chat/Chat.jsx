import React from "react";
import useSocket from "../../hooks/socket";

import { useSelector, useDispatch } from "react-redux";

import Navbar from "../Navbar/Navbar";
import FriendList from "./FriendList/FriendList";
import Messenger from "./Messenger/Messenger";

import "./Chat.scss";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  useSocket(user, dispatch);

  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <Messenger />
      </div>
    </div>
  );
};

export default Chat;
