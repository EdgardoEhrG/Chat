const socketIO = require("socket.io");

const { sequelize } = require("../models");
const Message = require("../models/message");

const users = new Map();
const userSockets = new Map();

const socketServer = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      let sockets = [];

      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[socket.id]];
        userSockets.set(socket.id, user.id);
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
        sockets.push(socket.id);
        userSockets.set(socket.id, user.id);
      }

      const onlineFriends = [];

      const chatters = await getChatters(user.id);

      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i]);
          chatters.sockets.forEach((socket) => {
            try {
              io.to(socket).emit("online", user);
            } catch (error) {}
          });
          onlineFriends.push(chatter.id);
        }
      }

      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("friends", onlineFriends);
        } catch (error) {}
      });
    });

    // -----------------------

    socket.on("message", async (message) => {
      let sockets = [];

      if (users.has(message.fromUser.id)) {
        sockets = users.get(message.fromUser.id).sockets;
      }

      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          sockets = [...sockets, ...users.get(id).sockets];
        }
      });

      try {
        const msg = {
          type: message.type,
          fromUserId: message.fromUser.id,
          chatId: message.chatId,
          message: message.message,
        };

        const savedMessage = await Message.create(msg);

        message.User = message.fromUser;
        message.fromUserId = message.fromUser.id;
        message.id = savedMessage.id;
        message.message = savedMessage.message;
        delete message.fromUser;

        sockets.forEach((socket) => {
          io.to(socket).emit("received", message);
        });
      } catch (error) {}
    });

    // -----------------------

    socket.on("typing", (message) => {
      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            io.to(socket).emit("typing", message);
          });
        }
      });
    });

    // -----------------------

    socket.on("add-friend", (chats) => {
      try {
        let online = "offline";

        if (users.has(chats[1].Users[0].id)) {
          online = "online";
          chats[0].Users[0].status = "online";
          users.get(chats[1].Users[0].id).socket.forEach((socket) => {
            io.to(socket).emit("new-chat", chats[0]);
          });
        }

        if (users.has(chats[0].Users[0].id)) {
          chats[1].Users[0].status = online;
          users.get(chats[0].Users[0].id).socket.forEach((socket) => {
            io.to(socket).emit("new-chat", chats[1]);
          });
        }
      } catch (error) {}
    });

    // -----------------------

    sock.on("add-user-to-group", ({ chat, newChatter }) => {
      if (users.has(newChatter.id)) {
        newChatter.status = "online";
      }

      chat.Users.forEach((user, index) => {
        if (users.has(user.id)) {
          chat.Users[index].status = "online";
          users.get(user.id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("add-user-to-group", {
                chat,
                chatters: [newChatter],
              });
            } catch (error) {}
          });
        }
      });

      if (users.has(newChatter.id)) {
        users.get(newChatter.id).sockets.forEach((socket) => {
          try {
            io.to(socket).emit("add-user-to-group", {
              chat,
              chatters: chat.Users,
            });
          } catch (error) {}
        });
      }
    });

    // -----------------------

    socket.on("leave-current-chat", (data) => {
      const { chatId, userId, currentUserId, notifyUsers } = data;

      notifyUsers.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("remove-user-from-chat", {
                chatId,
                userId,
                currentUserId,
              });
            } catch (error) {}
          });
        }
      });
    });

    // -----------------------

    socket.on("delete-chat", (data) => {
      const { chatId, notifyUsers } = data;

      notifyUsers.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("delete-chat", parseInt(chatId));
            } catch (error) {}
          });
        }
      });
    });

    // -----------------------

    socket.on("disconnect", async () => {
      if (userSockets.has(socket.id)) {
        const user = users.get(userSockets.get(socket.id));

        if (users.sockets.length > 1) {
          user.sockets = user.sockets.filter((sock) => {
            if (sock !== socket.id) return true;
            userSockets.delete(sock);
            return false;
          });
          users.set(user.id, user);
        } else {
          const chatters = getChatters(user.id);

          for (let i = 0; i < chatters.length; i++) {
            if (users.has(chatters[i])) {
              users.get(chatters[i]).sockets.forEach((socket) => {
                try {
                  io.to(socket).emit("offline", user);
                } catch (error) {}
              });
            }
          }
          userSockets.delete(socket.id);
          users.delete(user.id);
        }
      }
    });
  });
};

const getChatters = async (userId) => {
  try {
    const [results, metaData] = await sequelize.query(`
      select "cu"."userId" from "ChatUser" as cu
      inner join (
        select "c"."id" from "Chats" as c
        where exists (
          select "u"."id" from "Users" as u
          inner join "ChatUsers" on u.id = "ChatUsers"."userId"
          where u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
        )
      ) as cjoin on cjoin.id = "cu"."chatId"
      where "cu"."userId" != ${parseInt(userId)}
    `);

    return results.length > 0 ? results.map((el) => el.userId) : [];
  } catch (error) {
    return [];
  }
};

module.exports = socketServer;
