import React from 'react'
import '../styles/inbox.css'
import { FaArrowRight } from "react-icons/fa";

const ChatCard = ({ chat, setChatId }) => {

    return (
        <button onClick={ ()=> setChatId(chat.id) } className="chat-card-container">
            <div className="receiver-info">
            {chat.recievers.map((i) => 
                <>
                    <img src={i.profilepic} width="50px" className="chat-profile-pic"/>
                    <p> {i.username} </p>
                </>
            )}
            </div>
            <h4 className="recent-message"> {chat.recentmessage} </h4>
            <FaArrowRight color="white" className="arrow"size={45} />
        </button>
        
    )
}

export default ChatCard