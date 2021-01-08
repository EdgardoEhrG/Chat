import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout, updateProfile } from "../../store/actions/auth";

import Modal from "../Modal/Modal";

import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      password: "",
    },
  });
  const [avatar, setAvatar] = useState(user.avatar);

  const changeShowProfileStatus = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const logOut = () => {
    dispatch(logout);
  };

  const updateUser = (e) => {
    e.preventDefault();
    const { firstName, lastName, gender, email, password } = profile.data;
    const data = { firstName, lastName, gender, email, password, avatar };

    if (password.length > 0) {
      data.password = password;
    }

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    dispatch(updateProfile(formData)).then(() => setShowModal(false));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { data } = user;

    setProfile({
      data: {
        ...data,
        [name]: value,
      },
    });
  };

  const { firstName, lastName, gender, email, password } = profile.data;

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>
      <div id="profile-menu" onClick={changeShowProfileStatus}>
        <img width="40" height="40" src={user.avatar} alt="avatar" />
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        {showProfileOptions && (
          <div id="profile-options">
            <p onClick={openModal}>Update profile</p>
            <p onClick={logOut}>Logout</p>
          </div>
        )}
        {showModal && (
          <Modal onClick={() => setShowModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update profile</h3>
            </Fragment>
            <Fragment key="body">
              <form onSubmit={updateUser}>
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
                <div className="input-field mb-2">
                  <input
                    type="file"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.files)}
                    required
                  />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button className="btn-success">Update</button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Navbar;
