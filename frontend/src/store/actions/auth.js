import { LOGIN, REGISTER, LOGOUT } from "../types";

import { authService } from "../../services/auth";

export const login = (params, history) => (dispatch) => {
  const { email, password } = params;
  return authService.login({ email, password }).then((data) => {
    dispatch({
      type: LOGIN,
      payload: data,
    });
    history.push("/");
  });
};

export const register = (params, history) => (dispatch) => {
  const { firstName, lastName, gender, email, password } = params;
  return authService
    .register({ firstName, lastName, gender, email, password })
    .then((data) => {
      dispatch({
        type: REGISTER,
        payload: data,
      });
      history.push("/");
    });
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({ type: LOGOUT });
};
