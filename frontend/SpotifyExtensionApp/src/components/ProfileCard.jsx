import React from 'react'
import '../roots/discover.css'
import { IoIosPaperPlane } from "react-icons/io";

const ProfileCard = ({ data, variant }) => {    
    return (
        <>
            { variant == "user" &&
                <div className="profile-card-container">
                    <img src={data.profilepic} className="profile-pic"/>
                    <h5 className="profile-card-username">{data.username}</h5>
                    <div className="action-container">
                        <IoIosPaperPlane color="white" />
                        <a href="/Inbox">Message</a>
                    </div>
                </div >
            }

            {variant == "artist" &&
                <div className="profile-card-container">
                    <img src={data.image} className="profile-pic"/>
                    <h5 className="profile-card-username">{data.name}</h5>
                </div >
            }
        </>
  )
}

export default ProfileCard