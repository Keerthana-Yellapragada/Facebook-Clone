import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useDispatch,
  useSelector
} from "react-redux"
import { Modal } from "../../context/Modal";
import "../../context/Modal.css";
import NewPostForm from ".";
import { closeModal } from "../../context/Modal";

const NewPostFormModal = ({ userName }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.session.user);

  if (!user) {
    return null;
  }

  const closeModal = () => {
    setShowModal(false);
    history.push("/homepage");
  };

  return (
    <>
      {/* <button className="modal-button" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-pencil"></i>
      </button> */}
      <div
        className="modal-button create-post-click-container"
        onClick={() => setShowModal(true)}
      >
        <div className="create-post-modal-user-image-container">
        <img
          className="create-post-modal-click-post-user-profile-pic"
          src={user.profile_image}
          alt="user-profile-pics"
        />
        </div>
        <div className="create-post-modal-click-input">
          What's on your mind, {userName}?{" "}
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewPostForm />
        </Modal>
      )}
    </>
  );
};

export default NewPostFormModal;
