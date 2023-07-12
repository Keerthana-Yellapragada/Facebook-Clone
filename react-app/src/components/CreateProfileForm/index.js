import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import "../../context/Modal.css"
import NewProfileForm from '.';
import {
  closeModal
} from "../../context/Modal"


const NewProfileFormModal = ({userName}) => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
   setShowModal(false)
    history.push('/homepage')
  }

  return (
    <>

      <button className="modal-button create-profile-click-container" onClick={() => setShowModal(true)}>Profile</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewProfileForm showModal={showModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewProfileFormModal;
