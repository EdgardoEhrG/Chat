import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat } from "../../../store/actions/chat";
import chatService from "../../../services/chat";

import Friend from "../Friend/Friend";
import Modal from "../../Modal/Modal";

import "./FriendLists.scss";

const FriendList = () => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chatReducer.chats);
  const socket = useSelector((state) => state.chatReducer.socket);

  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const searchFriends = (e) => {
    chatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    chatService.createChat(id).then((chats) => {
      socket.emit("add-friend", chats);
      setShowFriendsModal(false);
    });
  };

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  return (
    <div id="friends" className="shadow-light">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendsModal(true)}>Add</button>
      </div>
      <hr />
      <div id="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => {
            return <Friend click={openChat(chat)} chat={chat} key={chat.id} />;
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
      {showFriendsModal && (
        <Modal click={() => setShowFriendsModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Create new chat</h3>
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
      )}
    </div>
  );
};

export default FriendList;
