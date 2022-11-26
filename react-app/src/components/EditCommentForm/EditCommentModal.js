import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import "../../context/Modal.css"
import EditCommentForm from '.';
import {
  closeModal
} from "../../context/Modal"

function EditCommentFormModal({commentId}) {
    const history = useHistory()
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
    setShowModal(false)
    history.push('/homepage')
  }

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-pencil"></i>
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm closeModal={closeModal} commentId={commentId}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentFormModal;
