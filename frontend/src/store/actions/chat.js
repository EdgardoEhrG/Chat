import chatService from "../../services/chat";

import {
  SET_SOCKET,
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  FRIENDS_OFFLINE,
  FRIENDS_ONLINE,
  FRIEND_ONLINE,
  RECEIVED_MESSAGES,
  SENDER_TYPING,
  PAGINATE_MESSAGES,
  INCREMENT_SCROLL,
  CREATE_CHAT,
  ADD_USER_TO_GROUP,
  LEAVE_CURRENT_CHAT,
  DELETE_CURRENT_CHAT,
} from "../types";

export const setSocket = (socket) => (dispatch) => {
  dispatch({ type: SET_SOCKET, payload: socket });
};

export const fetchChats = () => (dispatch) => {
  return chatService
    .fetchChats()
    .then((data) => {
      data.forEach((chat) => {
        chat.Users.forEach((user) => {
          user.status = "offline";
        });
        chat.Messages.reverse();
      });
      dispatch({ type: FETCH_CHATS, payload: data });
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const setCurrentChat = (chat) => (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};

export const onlineFriends = (friends) => (dispatch) => {
  dispatch({ type: FRIENDS_ONLINE, payload: friends });
};

export const onlineFriend = (friend) => (dispatch) => {
  dispatch({ type: FRIEND_ONLINE, payload: friend });
};

export const offlineFriends = (friend) => (dispatch) => {
  dispatch({ type: FRIENDS_OFFLINE, payload: friend });
};

export const receivedMessage = (message, userId) => (dispatch) => {
  dispatch({ type: RECEIVED_MESSAGES, payload: { message, userId } });
};

export const senderTyping = (sender) => (dispatch) => {
  dispatch({ type: SENDER_TYPING, payload: sender });
};

export const incrementScroll = () => (dispatch) => {
  dispatch({ type: INCREMENT_SCROLL });
};

export const createChat = (chat) => (dispatch) => {
  dispatch({ type: CREATE_CHAT, payload: chat });
};

export const addUserToGroup = (group) => (dispatch) => {
  dispatch({ type: ADD_USER_TO_GROUP, payload: group });
};

export const leaveCurrentChat = (data) => (dispatch) => {
  dispatch({ type: LEAVE_CURRENT_CHAT, payload: data });
};

export const deleteCurrentChat = (chatId) => (dispatch) => {
  dispatch({ type: DELETE_CURRENT_CHAT, payload: chatId });
};

export const paginateMessages = (id, page) => (dispatch) => {
  return chatService
    .paginateMessages(id, page)
    .then(({ messages, pagination }) => {
      if (typeof messages !== "undefined" && messages.length > 0) {
        messages.reverse();
        const payload = { messages, id, pagination };
        dispatch({ type: PAGINATE_MESSAGES, payload });
        return true;
      }

      return false;
    })
    .catch((err) => {
      throw err;
    });
};
