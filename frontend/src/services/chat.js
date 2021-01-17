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
};

export default chatService;
