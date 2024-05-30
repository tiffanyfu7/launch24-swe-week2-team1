import React from 'react';
import '../styles/editprofilemodal.css';

const EditProfileModal = ({ toggleModal }) => {
  // No need for local state here, using the prop to toggle

  // prevent scrolling in the background when modal is open
  document.body.classList.add('active-modal');

  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <p>
          Private account
          {/* add toggle on right side to turn on and off profile privacy */}
          {/* Use chadcn switch import to create toggle */}
          {/* update state of profile privacy and save to firebase */}
        </p>
        <p>
          Display top artists
          {/* add toggle on right side to turn on and off display of top artists */}
          {/* Use chadcn switch import to create toggle */}
          {/* update state of profile privacy and save to firebase */}
        </p>
        <p>
          Display top songs
          {/* add toggle on right side to turn on and off display of top songs*/}
          {/* Use chadcn switch import to create toggle */}
          {/* update state of profile privacy and save to firebase */}
        </p>
        <button className="close-modal" onClick={toggleModal}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
