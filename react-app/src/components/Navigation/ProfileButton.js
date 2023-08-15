// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom';
import { Modal } from '../../context/Modal'
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import SignupForm from '../SignUpFormModal'
import LoginForm from '../auth/LoginForm'


import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout()).then(() => history.push("/"))
  };


  let loggedInOrNot;
  if (user) {
    loggedInOrNot = (
      <>
        <button className="actual-button" onClick={openMenu}>
          <div className="profile-button-container" id="pink">

            <img id="nav-profile-pic"
              className='post-user-profile-pic'
              src={user.profile_image}
              alt="user-profile-pics"

            />
          </div>
        </button>
        {showMenu && (
          <div className="dropdown-content">


            <div className="dropdown-container-sections">
              <div className="profile-page" onClick={() => history.push(`/users/${user.id}/`)}>
                <img id="nav-section-profile-pic"
                  className='post-user-profile-pic nav-profile-pic-section'
                  src={user.profile_image} alt="user-profile-pics"

                />
                <div>Profile</div>
              </div>
            </div>

            <div className="dropdown-container-sections">
              <div className="log-out" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <div>Log Out </div>
              </div>
            </div>

          </div>
        )}
      </>
    )
  } else {
    loggedInOrNot = (
      <>
        <button className="actual-button" onClick={openMenu}>
          <div className="profile-button-container" id="pink">
            <span className="fa-solid fa-bars fa-2x"></span>
            <span className="fa-solid fa-circle-user fa-2x"></span>
          </div>
        </button>
        {showMenu && (
          <div className="dropdown-content">
            <div className="sign-up-text" onClick={() => history.push("/")}>Sign Up</div>
            <div className="log-in-text" onClick={() => history.push("/")}>Log In</div>

          </div>
        )}



      </>
    )
  }

  return (
    <>
      {loggedInOrNot}
    </>
  );
}

export default ProfileButton;
