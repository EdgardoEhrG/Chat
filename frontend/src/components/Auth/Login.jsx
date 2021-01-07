import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";

import "./Auth.scss";
import LoginImg from "../../assets/images/Login.svg";

const Login = ({ history }) => {
  const [user, setUser] = useState({
    data: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();
    const { email, password } = user.data;
    dispatch(login({ email, password }, history));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { data } = user;

    setUser({
      data: {
        ...data,
        [name]: value,
      },
    });
  };

  const { email, password } = user.data;

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={LoginImg} alt="login" />
          </div>
          <div id="form-section">
            <h2>Welcome back</h2>
            <form onSubmit={loginUser}>
              <div className="input-field mb-1">
                <input
                  type="email"
                  value={email}
                  name="email"
                  required
                  placeholder="Enter your email"
                  onChange={onChange}
                />
              </div>
              <div className="input-field mb-2">
                <input
                  type="password"
                  value={password}
                  name="password"
                  required
                  placeholder="Enter your password"
                  onChange={onChange}
                />
              </div>
              <button type="submit">Sign In</button>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
