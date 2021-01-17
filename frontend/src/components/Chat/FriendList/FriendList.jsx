import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat } from "../../../store/actions/chat";

import Friend from "../Friend/Friend";

import "./FriendLists.scss";

const FriendList = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatReducer.chats);

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  return (
    <div id="friends" className="shadow-light">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button>Add</button>
        <hr />
        <div id="friends-box">
          {chats.length > 0 ? (
            chats.map((chat) => {
              return (
                <Friend click={openChat(chat)} chat={chat} key={chat.id} />
              );
            })
          ) : (
            <p id="no-chat">No friends added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
