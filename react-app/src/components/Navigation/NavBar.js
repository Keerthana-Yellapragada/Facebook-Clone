// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './NavBar.css';
// import cb from './Images/cb.png'
// import cb2 from './Images/cb2.png'
import WellnessPage from './logo.png'



function NavBar({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    const sessionUserId = sessionUser.id
    sessionLinks = (
      <>
        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      </>

    );
  } else {
    sessionLinks = (
      <>
      </>
    );
  }

  return (
    <>
      {sessionUser ?
        (
          <>
            <div className="navbar-main">
              <div className="navbar-inner-container">

                <div className="Home-Container">
                  <NavLink exact to="/homepage"><img className='logo' src={WellnessPage} alt="logo here" /></NavLink>
                  {/* <NavLink exact to="/homepage">WellnessPage</NavLink> */}
                </div>



                <div className="Right-Side-Container">
                  {sessionLinks}
                </div>

              </div>
            </div>
          </>
        )
        : null}
    </>
  );
}


export default NavBar;
