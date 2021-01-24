import React, { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { incrementScroll } from "../../../store/actions/chat";
import chatService from "../../../services/chat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import "./MessageInput.scss";

const MessageInput = ({ chat }) => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.chatReducer.socket);
  const user = useSelector((state) => state.authReducer.user);
  const newMessage = useSelector((state) => state.chatReducer.newMessage);

  const fileUpload = useRef();
  const msgInput = useRef();

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const msgBox = document.getElementById("msg-box");

    if (
      !newMessage.seen &&
      newMessage.chatId === chat.id &&
      msgBox.scrollHeight !== msgBox.clientHeight
    ) {
      if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
        dispatch(incrementScroll());
      } else {
        setShowNotification(true);
      }
    } else {
      showNotification(false);
    }
  }, [newMessage, dispatch, chat.id, showNotification]);

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    } else if (value.length === 0) {
      receiver.typing = false;
      socket.emit("typing", receiver);
    }
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const toggleEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const fileTrigger = () => {
    fileUpload.current.click();
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);
    chatService
      .uploadImage(formData)
      .then((image) => {
        sendMessage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectEmoji = (emoji) => {
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;
    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus();
    msgInput.current.selectionEnd = endPosition + emojiLength;
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setImage("");
    setShowEmojiPicker(false);

    socket.emit("message", msg);
  };

  const showNewMessage = () => {
    dispatch(incrementScroll());
    setShowNotification(false);
  };

  return (
    <div id="input-container">
      <div id="image-upload-container">
        <div>
          {showNotification ? (
            <div id="message-notification" onClick={showNewMessage}>
              <FontAwesomeIcon icon="bell" className="fa-icon" />
              <p className="m-0">New message</p>
            </div>
          ) : null}
        </div>
        <div id="image-upload">
          {image.name ? (
            <div id="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                icon="upload"
                className="fa-icon"
                onClick={handleImageUpload}
              />
              <FontAwesomeIcon
                icon="times"
                className="fa-icon"
                onClick={() => setImage("")}
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            icon={("far", "smile")}
            className="fa-icon"
            onClick={fileTrigger}
          />
        </div>
      </div>
      <div id="message-input">
        <input
          ref={msgInput}
          type="text"
          value={message}
          placeholder="Message..."
          onChange={handleMessage}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          icon={["far", "smile"]}
          className="fa-icon"
          onClick={toggleEmoji}
        />
      </div>
      <input
        type="file"
        name=""
        id="chat-image"
        ref={fileUpload}
        onChange={handleImage}
      />
      {showEmojiPicker ? (
        <Picker
          title="Pick ur emoji"
          emoji="point_up"
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
          onSelect={selectEmoji}
        />
      ) : null}
    </div>
  );
};

export default MessageInput;
