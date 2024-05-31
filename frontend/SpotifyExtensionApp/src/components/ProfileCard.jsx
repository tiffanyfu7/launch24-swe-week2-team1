import React from 'react'
import '../styles/discover.css'
import { IoIosPaperPlane } from "react-icons/io";

const ProfileCard = ({ profileData, variant }) => {    
    
    // will display default orange background if profilepic is null for user
    let isProfilePic = false;
    if (profileData && profileData.profilepic) {
        isProfilePic = true;
    }
    
    return (
        <>
            { variant == "user" &&
                <div className="profile-card-container">
                    {isProfilePic ? (
                        <img src={profileData.profilepic} className="profile-pic"/>
                    ) : (
                        <div className="empty-profile-pic"></div>
                    )}
                    
                    <h5 className="profile-card-username">{profileData.username}</h5>
                    <div className="action-container">
                        <IoIosPaperPlane color="white" />
                        <a href="/Inbox">Message</a>
                    </div>
                </div>
            }

            {variant == "artist" &&
                <div className="profile-card-container">
                    <img src={profileData.image} className="profile-pic"/>
                    <h5 className="profile-card-username">{profileData.name}</h5>
                </div >
            }
        </>
  )
}

export default ProfileCard