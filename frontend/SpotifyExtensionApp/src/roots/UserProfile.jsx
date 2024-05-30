import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';
import EditProfileModal from '../components/EditProfileModal';

const UserProfile = ({ userId }) => {
  const { userID, userName } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="profileContainer"> 
        <div className="profilePic"></div>
        <div className="profileBio"> 
          <h3>{userName}</h3>
          <h6>Cool One Line Status</h6>
          <h6>5 Followers * 30 Following</h6>
          <button onClick={toggleModal}>Edit Profile</button>
          <button>Inbox</button>
        </div>
      </div>  
      {isModalOpen && <EditProfileModal toggleModal={toggleModal} />}
    </>
  )
}

export default UserProfile;
