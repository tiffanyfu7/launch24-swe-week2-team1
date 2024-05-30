import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';
import EditProfileModal from '../components/EditProfileModal';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const { userID, userName, docID } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  return (
    <>
      <a href="/Discover"> 
        <button className="profile-button" style={{width:"60px", height:"30px"}}> 
          <img src="/backarrow.png" alt="Back"></img>
        </button> 
      </a>
      <div className="main-container"> 
        <div className="profileContainer"> 
              <div className="profilePic"></div>
              <div className="profileBio"> 
                <h3> {userName} </h3>
                <h6> 5 Followers * 30 Following</h6>
                <div className="button-container"> 
                  <button onClick={toggleModal} className="profile-button"> Edit Profile </button>
                  <button className="profile-button"> Inbox </button>
                </div>
              </div>
        </div>
        
        <h4 className="song-header"> Top Songs </h4> 

      </div>
      {isModalOpen && <EditProfileModal toggleModal={toggleModal} />}
    </>
  )
}

export default UserProfile;
