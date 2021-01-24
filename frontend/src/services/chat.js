import api from "./api";

const chatService = {
  fetchChats: () => {
    return api
      .get("/chats")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  uploadImage: (data) => {
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    return api
      .post("/chats/upload-image", data, headers)
      .then((data) => {
        return data.url;
      })
      .catch((err) => {
        throw err;
      });
  },
  paginateMessages: (id, page) => {
    return api
      .get("/chats/messages", { params: { id, page } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  searchUsers: (term) => {
    return api
      .get("/users/search-users", { params: { term } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  createChat: (partnerId) => {
    return api
      .post("/chats/create", { partnerId })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  addFriendToGroupChat: (userId, chatId) => {
    return api
      .post("/chats/add-user-to-group", { userId, chatId })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  leaveCurrentChat: (chatId) => {
    return api
      .post("/chats/leave-current-chat", { chatId })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteCurrentChat: (chatId) => {
    return api
      .delete(`/chats/${chatId}`)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default chatService;
