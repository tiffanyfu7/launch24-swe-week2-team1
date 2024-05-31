import React, { useContext } from 'react'
import '../styles/inbox.css'
import { AuthContext } from './AuthContext'

const Message = ({ message }) => {
    // add right and left variant
    const { userName } = useContext(AuthContext);
    console.log(message.username);
    const senderBool = userName == message.username;
    console.log(senderBool);
    return (
        <>
            <div style={{ marginLeft: senderBool ? "650px": "0px"}}>
                <div className="message-container" style={{ backgroundColor: senderBool ? "beige": "#F9BC60"}}>
                    <img src={message.profilepic} className="message-profile-pic" />
                    <div className="message-info">
                        <h5>{message.username}</h5>
                        <p className="message">{message.message}</p>
                    </div>
                </div>
                <p className="timestamp" style={{ color: "#3A3A3A"}}>{message.timestamp}</p>
            </div>
        </>
    )
}

export default Message