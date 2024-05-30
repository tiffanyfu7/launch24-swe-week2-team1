import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';

const UserProfile = ({ userId }) => {
  
  const { userID, userName } = useContext(AuthContext);

  return (
    <>
      {/* <h1>User Profile</h1> */}
      <div className="profileContainer"> 
            <div className="profilePic"></div>
            <div className="profileBio"> 
              <h3> {userName} </h3>
              <h6> Cool One Line Status </h6>
              <h6> 5 Followers * 30 Following</h6>
              <button> Edit Profile </button>
              <button> Inbox </button>
            </div>
      </div>  
    </>
  )
}

export default UserProfile
