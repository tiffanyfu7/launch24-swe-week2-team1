import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';

const UserProfile = ({ userId }) => {
  
  const { userID, userName } = useContext(AuthContext);

  
  
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
                  <button className="profile-button"> Edit Profile </button>
                  <button className="profile-button"> Inbox </button>
                </div>
              </div>
        </div>
        <h4 className="song-header"> Top Songs </h4> 

      
      </div>
    </>
  )
}

export default UserProfile
