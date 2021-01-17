import React from "react";

const Message = ({ user, chat, index, message }) => {
  const determineMargin = () => {
    if (index + 1 === chat.Messages.length) return "";

    return message.fromUserId === chat.Messages[index + 1].fromUserId
      ? "mb-5"
      : "mb-10";
  };

  return (
    <div className={`message ${determineMargin()}`}>
      <div className={message.fromUserId === user.id ? "creator" : ""}>
        {message.fromUserId !== user.id ? (
          <h6 className="m-0">{`${message.User.firstName} ${message.User.lastName}`}</h6>
        ) : null}
        {message.type === "text" ? (
          <p className="m-0">{message.message}</p>
        ) : (
          <img src={message.message} alt="uploads" />
        )}
      </div>
    </div>
  );
};

export default Message;
