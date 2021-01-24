import React, { Fragment, useState } from "react";

import { useSelector } from "react-redux";
import chatService from "../../../services/chat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modal/Modal";

import { userStatus } from "../../../utils/helpers";

import "./ChatHeader.scss";

const ChatHeader = ({ chat }) => {
  const socket = useSelector((state) => state.chatReducer.socket);

  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const showOptions = () => {
    setShowChatOptions(!showChatOptions);
  };

  const searchFriends = (e) => {
    chatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    chatService.addFriendToGroupChat(id, chat.id).then((data) => {
      socket.emit("add-user-to-group", data);
      setShowAddFriendModal(false);
    });
  };

  const leaveCurrentChat = () => {
    chatService
      .leaveCurrentChat(chat.id)
      .then((data) => {
        socket.emit("leave-current-chat", data);
      })
      .catch((err) => console.log(err));
  };

  const deleteCurrentChat = () => {
    chatService.deleteCurrentChat(chat.id).then((data) => {
      socket.emit("delete-chat", data);
    });
  };

  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        icon={["fas", "ellipsis-v"]}
        className="fa-icon"
        onClick={showOptions}
      />
      {showChatOptions ? (
        <div id="settings" onClick={() => setShowAddFriendModal(true)}>
          <div>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>
          {chat.type === "group" ? (
            <div onClick={leaveCurrentChat}>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave chat</p>
            </div>
          ) : null}
          {chat.type === "dual" ? (
            <div onClick={deleteCurrentChat}>
              <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
              <p>Delete chat</p>
            </div>
          ) : null}
        </div>
      ) : null}
      {showAddFriendModal ? (
        <Modal click={() => setShowAddFriendModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Add friend to group chat</h3>
          </Fragment>
          <Fragment key="body">
            <p>Find friends by typin' their name bellow</p>
            <input
              type="search"
              onInput={searchFriends}
              placeholder="Search..."
            />
            <div id="suggestions">
              {suggestions.map((user) => {
                return (
                  <div id={user.id} className="suggestion">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <button onClick={addNewFriend(user.id)}>Add</button>
                  </div>
                );
              })}
            </div>
          </Fragment>
          <Fragment key="footer"></Fragment>
        </Modal>
      ) : null}
    </Fragment>
  );
};

export default ChatHeader;
