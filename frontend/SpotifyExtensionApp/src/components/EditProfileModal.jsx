import React from 'react';
import { useState } from 'react';
import '../styles/editprofilemodal.css';
import Switch from 'react-switch';
import { IoMdClose } from "react-icons/io";

const EditProfileModal = ({ 
  toggleModal,
  isPrivate,
  displayTopSongs,
  displayTopArtists,
  displaySavedAlbums,
  setIsPrivate,
  setDisplayTopSongs,
  setDisplayTopArtists,
  setDisplaySavedAlbums
}) => {
  
  // prevent scrolling in the background when modal is open
  document.body.classList.add('active-modal');

  // const [isPrivate, setIsPrivate] = useState(false);
  // const [displayTopArtists, setDisplayTopArtists] = useState(true);
  // const [displayTopSongs, setDisplayTopSongs] = useState(true);
  // const [displaySavedAlbums, setDisplaySavedAlbums] = useState(true);


  // const handleSaveChanges = (setting) => {
  //   switch (setting) {
  //     case 'privateAccount':
  //       setIsPrivate(!isPrivate);
  //       break;
  //     case 'displayTopArtists':
  //       setDisplayTopArtists(!displayTopArtists);
  //       break;
  //     case 'displayTopSongs':
  //       setDisplayTopSongs(!displayTopSongs);
  //       break;
  //     case 'displaySavedAlbums':
  //       setDisplaySavedAlbums(!displaySavedAlbums);
  //       break;
  //     default:
  //       break;
  //   }
  //   // TODO: Save changes to the user's profile in firebase
  //   //hide display for top artists or top songs
  //   toggleModal();
  // }

  const handleToggle = (setter, value) => {
    setter(!value);
  }


return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2 style={{ fontSize: "2em"}}>Edit Profile</h2>
        <div className="option">
          <p>Private account</p>
          <Switch
            onChange={() => handleToggle(setIsPrivate, isPrivate)}
            checked={isPrivate}
          />
        </div>
        <div className="option">
          <p>Display Top Artists</p>
          <Switch
            onChange={() => handleToggle(setDisplayTopArtists, displayTopArtists)}
            checked={displayTopArtists}
          />
        </div>
        <div className="option">
          <p>Display Top Songs</p>
          <Switch
            onChange={() => handleToggle(setDisplayTopSongs, displayTopSongs)}
            checked={displayTopSongs}
          />
        </div>
        <div className="option">
          <p>Display Saved Albums</p>
          <Switch
            onChange={() => handleToggle(setDisplaySavedAlbums, displaySavedAlbums)}
            checked={displaySavedAlbums}
          />
        </div>
        {/* <button className="close-modal" onClick={handleSaveChanges}>
          Save Changes
        </button> */}
        <button className="X-button" onClick = {toggleModal} >
            <IoMdClose />
            </button>
      </div>
    </div>
  );
};


export default EditProfileModal;
