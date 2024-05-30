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
      <a href="/Discover" className="back-button-link"> 
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
                  <a href="/Inbox" style={{textDecoration:"none"}}> 
                    <button className="profile-button"> Inbox </button>
                  </a>
                </div>
              </div>
        </div>
        {isModalOpen && <EditProfileModal toggleModal={toggleModal} />}
        <h4 className="content-header"> Top Liked Songs </h4> 
        <div className="content-container"> 
          {/* map songs and add div within map */}
          <div className="songs"> 

          </div>
          <div className="songs"> 
            
          </div>
          <div className="songs"> 
            
          </div>
          <div className="songs"> 
            
          </div>
        </div>
        <h4 className="content-header"> Top Artists </h4>
        <div className="content-container"> 
          {/* map artists and add div within map */}
          <div className="artists"> 
          
          </div>
          <div className="artists"> 
          
          </div>
          <div className="artists"> 
          
          </div>
          <div className="artists"> 
          
          </div>
        </div>
        <h4 className="content-header"> Saved Albums </h4>
        <div className="content-container"> 
          {/* map albums and add div within map */}
          <div className="albums"> 
          
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile;
