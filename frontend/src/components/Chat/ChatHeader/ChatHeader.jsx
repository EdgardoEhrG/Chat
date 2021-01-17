import React, { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { userStatus } from "../../../utils/helpers";

import "./ChatHeader.scss";

const ChatHeader = ({ chat }) => {
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
  const [shoDeleteChatModal, setShoDeleteChatModal] = useState(false);

  const showOptions = () => {
    setShowChatOptions(!showChatOptions);
  };

  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info">
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
        <div id="settings">
          <div>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>
          {chat.type === "group" ? (
            <div>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave chat</p>
            </div>
          ) : null}
          <div>
            <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
            <p>Delete chat</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ChatHeader;
