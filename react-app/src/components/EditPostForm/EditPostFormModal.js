import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import "../../context/Modal.css"
import EditPostForm from '.';
import {
  closeModal
} from "../../context/Modal"

function EditPostFormModal({postId}) {
    const history = useHistory()
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
    setShowModal(false)
    history.push('/homepage')
  }

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm closeModal={closeModal} postId={postId}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostFormModal;
