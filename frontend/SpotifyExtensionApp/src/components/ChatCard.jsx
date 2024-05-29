import React from 'react'
import '../roots/inbox.css'

const ChatCard = ({ chat }) => {
    return (
        <div className="chat-card-container">
            {chat.recievers.map((i) => 
                <>
                    <img src={i.profilepic} width="50px" className="chat-profile-pic"/>
                    <p> {i.username}</p>
                </>
            )}
            
        </div>
    )
}

export default ChatCard