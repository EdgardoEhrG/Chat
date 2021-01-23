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
};

export default chatService;
