import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const changeShowProfileStatus = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const logOut = () => {
    dispatch(logout);
  };

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>
      <div id="profile-menu" onClick={changeShowProfileStatus}>
        <img width="40" height="40" src={user.avatar} alt="avatar" />
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        {showProfileOptions && (
          <div id="profile-options">
            <p>Update profile</p>
            <p onClick={logOut}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
