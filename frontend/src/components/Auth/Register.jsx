import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { register } from "../../store/actions/auth";

import "./Auth.scss";
import RegisterImg from "../../assets/images/Register.svg";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    data: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  const registerUser = (e) => {
    e.preventDefault();
    const { firstName, lastName, gender, email, password } = user.data;
    dispatch(
      register({ firstName, lastName, gender, email, password }, history)
    );
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

  const { firstName, lastName, gender, email, password } = user.data;

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={RegisterImg} alt="register" />
          </div>
          <div id="form-section">
            <h2>Create an account</h2>
            <form onSubmit={registerUser}>
              <div className="input-field mb-1">
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field mb-1">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field mb-1">
                <select value={gender} onChange={onChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input-field mb-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field mb-2">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <button>Sign Up</button>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
