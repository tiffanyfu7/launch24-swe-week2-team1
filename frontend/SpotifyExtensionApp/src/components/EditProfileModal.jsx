import React from 'react';
import { useState } from 'react';
import '../styles/editprofilemodal.css';
import Switch from 'react-switch';
import { IoMdClose } from "react-icons/io";

const EditProfileModal = ({ toggleModal }) => {
  
  // prevent scrolling in the background when modal is open
  document.body.classList.add('active-modal');

  const [isPrivate, setIsPrivate] = useState(false);
  const [displayTopArtists, setDisplayTopArtists] = useState(true);
  const [displayTopSongs, setDisplayTopSongs] = useState(true);


  const handleSaveChanges = (setting) => {
    switch (setting) {
      case 'privateAccount':
        setIsPrivate(!isPrivate);
        break;
      case 'displayTopArtists':
        setDisplayTopArtists(!displayTopArtists);
        break;
      case 'displayTopSongs':
        setDisplayTopSongs(!displayTopSongs);
        break;
      default:
        break;
    }
    // TODO: Save changes to the user's profile in firebase
    //hide display for top artists or top songs
    toggleModal();
}

return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <div className="option">
          <p>Private account</p>
          <Switch
            onChange={(checked) => setIsPrivate(checked)}
            checked={isPrivate}
          />
        </div>
        <div className="option">
          <p>Display top artists</p>
          <Switch
            onChange={(checked) => setDisplayTopArtists(checked)}
            checked={displayTopArtists}
          />
        </div>
        <div className="option">
          <p>Display top songs</p>
          <Switch
            onChange={(checked) => setDisplayTopSongs(checked)}
            checked={displayTopSongs}
          />
        </div>
        <button className="close-modal" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button class = "X-button" onClick = {toggleModal} >
            <IoMdClose />
            </button>
      </div>
    </div>
  );
};


export default EditProfileModal;
