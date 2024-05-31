import React from 'react';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchUserProfile();
}, [])

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

const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${userId}`);
      const userData = response.data;
      setIsPrivate(!userData.public);
      setDisplayTopArtists(userData.displayTopArtists);
      setDisplayTopSongs(userData.displayTopSongs);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleToggleChange = async (setting) => {
    let updatedState;
    switch (setting) {
      case 'privateAccount':
        updatedState = !isPrivate;
        setIsPrivate(updatedState);
        break;
      case 'displayTopArtists':
        updatedState = !displayTopArtists;
        setDisplayTopArtists(updatedState);
        break;
      case 'displayTopSongs':
        updatedState = !displayTopSongs;
        setDisplayTopSongs(updatedState);
        break;
      default:
        return;
    }

    try {
      await axios.put(`http://localhost:8000/users/${userId}`, {
        public: setting === 'privateAccount' ? !updatedState : !isPrivate,
        displayTopArtists: setting === 'displayTopArtists' ? updatedState : displayTopArtists,
        displayTopSongs: setting === 'displayTopSongs' ? updatedState : displayTopSongs
      });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <div className="option">
          <p>Private account</p>
          <Switch
            onChange={() => handleToggle(setIsPrivate, isPrivate)}
            // onChange={() => handleToggleChange('privateAccount')}
            checked={isPrivate}
          />
        </div>
        <div className="option">
          <p>Display Top Artists</p>
          <Switch
            onChange={() => handleToggle(setDisplayTopArtists, displayTopArtists)}
            // onChange={() => handleToggleChange('displayTopArtists')}
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
        {/* <button className="close-modal" onClick={toggleModal}>
          Save Changes
        </button> */}
        <button className="X-button" onClick = {toggleModal} >
            <IoMdClose />
            </button>
            {/* onChange={() => handleToggleChange('displayTopSongs')}
            checked={displayTopSongs}
          />
        </div>
        <button className="close-modal" onClick={toggleModal}>
          Save Changes
        </button>
        <button className="X-button" onClick={toggleModal}>
          <IoMdClose />
        </button> */}
      </div>
    </div>
  );
};

export default EditProfileModal;
