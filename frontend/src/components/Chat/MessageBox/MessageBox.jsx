import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { paginateMessages } from "../../../store/actions/chat";

import Message from "../Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./MessageBox.scss";

const MessageBox = ({ chat }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);

  const [isLoading, setLoading] = useState(false);
  const [scrollUp, setScrollUp] = useState(0);

  const msgBox = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollManual(Math.ceil(msgBox.current.scrollHeight * 0.1));
    }, 100);
  }, [scrollUp]);

  useEffect(() => {
    if (
      senderTyping.typing &&
      msgBox.current.scrollTop > msgBox.current.scrollHeight * 0.3
    ) {
      setTimeout(() => {
        scrollManual(msgBox.current.scrollHeight);
      }, 100);
    }
  }, [senderTyping]);

  useEffect(() => {
    if (!senderTyping.typing) {
      setTimeout(() => {
        scrollManual(Math.ceil(msgBox.current.scrollHeight));
      }, 100);
    }
  }, [senderTyping.typing, scrollBottom]);

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value;
  };

  const handleInfiniteScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLoading(true);
      const pagination = chat.Pagination;
      const page = typeof pagination === "undefined" ? 1 : pagination.page;

      dispatch(paginateMessages(chat.id, parseInt(page) + 1))
        .then((res) => {
          if (res) {
            setScrollUp(scrollUp + 1);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    }
  };

  return (
    <div id="msg-box" ref={msgBox} onScroll={handleInfiniteScroll}>
      {isLoading ? (
        <p className="loader m-0">
          <FontAwesomeIcon icon="spinner" className="fa-spin" />
        </p>
      ) : null}
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
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message">
          <div className="other-person">
            <p className="m-o">{`${senderTyping.fromUser.firstName} is typing...`}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MessageBox;
