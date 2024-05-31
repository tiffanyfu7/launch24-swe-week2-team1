import React from 'react'
import '../styles/inbox.css'

const Message = ({ message }) => {
    // add right and left variant
    return (
        <>
            <img src={message.profilepic} className="message-profile-pic"/>
            <h5>{message.username}</h5>
            <p className="message">{message.message}</p>
            <p className="timestamp">{message.timestamp}</p>
        </>
    )
}

export default Message