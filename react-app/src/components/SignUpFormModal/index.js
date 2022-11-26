// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm'
// import "./SignupFormModal.css"

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="Signup-Container"></div>
      <div className="sign-up-text" onClick={() => setShowModal(true)}>Sign up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
