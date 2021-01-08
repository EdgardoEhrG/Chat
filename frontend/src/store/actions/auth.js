import { LOGIN, REGISTER, LOGOUT, USER_UPDATE } from "../types";

import { authService } from "../../services/auth";

export const login = (params, history) => (dispatch) => {
  return authService.login(params).then((data) => {
    dispatch({
      type: LOGIN,
      payload: data,
    });
    history.push("/");
  });
};

export const register = (params, history) => (dispatch) => {
  return authService.register(params).then((data) => {
    dispatch({
      type: REGISTER,
      payload: data,
    });
    history.push("/");
  });
};

export const updateProfile = (params, history) => (dispatch) => {
  return authService
    .updateProfile(params)
    .then((data) => {
      dispatch({
        type: USER_UPDATE,
        payload: data,
      });
      history.push("/");
    })
    .catch((err) => {
      throw err;
    });
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({ type: LOGOUT });
};
