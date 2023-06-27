import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import SignUpFormModal from '../SignUpFormModal';
import SignUpForm from '../SignUpFormModal/SignUpForm';
import LoginForm from '../auth/LoginForm';
import { Modal } from '../../context/Modal'
import WellnessPage from '../Navigation/logo.png'
import './LandingPage.css'



function LandingPage(){
 const dispatch = useDispatch();
 const history = useHistory()

 const [showSignUpModal, setShowSignUpModal] = useState(false);

    return (
    <>
    <div className='landing-page-container'>

        <div className='main-page-logo-container'>
            <img className='main-page-logo' src={WellnessPage} alt="main-page-logo" />

              < h1 className = 'main-page-words' > Connect and share with the people in your life. </h1>

        </div>

        <div className='login-form-landing-page-container'>
             <LoginForm />
        </div>

    </div>
    </>
    )
}

export default LandingPage;
