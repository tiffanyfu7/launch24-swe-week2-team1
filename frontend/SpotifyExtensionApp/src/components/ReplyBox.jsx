import React, { useState } from 'react'
import '../styles/forum.css'

const ReplyBox = ({ setClickReply }) => {
    const [inputValue, setInputValue] = useState('');
    
    const handelPost = () => {
        
        console.log(inputValue);
        setClickReply(false);
        //setTimeout(setClickReply(false), 5000);
    }

    return (
        <div className="reply-box-container">
            <button onClick={() => setClickReply(false)}>x</button>
            <form onSubmit={() => handelPost()}>
                <input type="text"
                    placeholder="Type a Response..."
                    className="reply-input"
                    onChange={(event) => setInputValue(event.target.value)}
                >
                </input>
                <button type="button" className="reply-post-button">Post</button>
            </form>
        </div>
    )
}

export default ReplyBox