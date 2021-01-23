import { useEffect } from "react";

import socketIOClient from "socket.io-client";

import {
  setSocket,
  fetchChats,
  onlineFriends,
  onlineFriend,
  offlineFriends,
  receivedMessage,
  senderTyping,
} from "../store/actions/chat";

function useSocket(user, dispatch) {
  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => {
        const socket = socketIOClient.connect("http://127.0.0.1:3000");

        dispatch(setSocket(socket));

        socket.emit("join", user);

        socket.on("typing", (sender) => {
          dispatch(senderTyping(sender));
        });

        socket.on("friends", (friends) => {
          dispatch(onlineFriends(friends));
        });

        socket.on("online", (friend) => {
          dispatch(onlineFriend(friend));
        });

        socket.on("offline", (friend) => {
          dispatch(offlineFriends(friend));
        });

        socket.on("received", (message) => {
          dispatch(receivedMessage(message, user.id));
        });

        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [user, dispatch]);
}

export default useSocket;
