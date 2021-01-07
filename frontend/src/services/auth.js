import api from "./api";

export const authService = {
  login: (data) => {
    return api
      .post("/login", data)
      .then(({ data }) => {
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((err) => console.log(err));
  },
  register: (data) => {
    return api
      .post("/register", data)
      .then(({ data }) => {
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((err) => console.log(err));
  },
  logout: () => {
    api.defaults.headers["Authorization"] = "";
  },
};
