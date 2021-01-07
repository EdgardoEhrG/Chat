import { LOGIN, LOGOUT, REGISTER } from "../types";

const initialState = {
  user: null,
  token: "",
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: true,
      };
    case REGISTER: {
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: true,
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