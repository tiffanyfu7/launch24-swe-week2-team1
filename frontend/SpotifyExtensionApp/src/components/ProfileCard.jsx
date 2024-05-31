import React from 'react'
import '../styles/discover.css'
import { IoIosPaperPlane } from "react-icons/io";
import { Link } from 'react-router-dom';

const ProfileCard = ({ profileData, variant }) => {    
    
    // will display default orange background if profilepic is null for user
    let isProfilePic = false;
    if (profileData && profileData.profilepic) {
        isProfilePic = true;
    }

    // profileData.id is the DOC id, so changing the userprofile URL to link to that
    console.log(profileData.id);
    
    return (
        <>
            <Link to={`/user/${profileData.id}`} style={{textDecoration: "none"}}> 
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
            </Link>

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