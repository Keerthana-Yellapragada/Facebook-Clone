import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import SignUpFormModal from '../SignUpFormModal';
import SignUpForm from '../SignUpFormModal/SignUpForm';
import LoginForm from '../auth/LoginForm';
import { Modal } from '../../context/Modal'

function LandingPage(){
 const dispatch = useDispatch();
 const history = useHistory()

 const [showSignUpModal, setShowSignUpModal] = useState(false);

    console.log("showsignupmodal", showSignUpModal)

    return (
    <>


        <div className='login-form-landingpage-container'>
             <LoginForm />
        </div>


             {/* <div className='signup-container'>
                        <button className="signup-modal-button" onClick={() => setShowSignUpModal(true)}>Sign up</button>
                        {showSignUpModal && (
                            <Modal onClose={() => setShowSignUpModal(false)}>
                                <SignUpForm />
                            </Modal>
                        )}
            </div> */}


            </>

    )
}

export default LandingPage;
