import { LOGIN, LOGOUT, REGISTER, USER_UPDATE } from "../types";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || "",
  isLoggedIn: !!localStorage.getItem("user"),
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
      };
    case REGISTER: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
      };
    }
    case USER_UPDATE: {
      return {
        ...state,
        user: payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
        token: "",
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
