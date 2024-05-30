import React, { useContext, useState } from 'react'
import '../styles/forum.css'
import { AuthContext } from './AuthContext';
import axios from 'axios';

const ReplyBox = ({ setClickReply, forumId }) => {
    const [inputValue, setInputValue] = useState('');
    const { docID } = useContext(AuthContext);
    
    //push to forum/replies
    // replies = [{
    //     forumId: ,
    //     createdAt: ,
    //     message: ,
    //     userId:
    // }]

        //     const id = req.body.forumId;
        // const timestamp = req.body.createdAt;
        // const message = req.body.message;
    // const userId = req.body.userId;
    const postReply = async () => {
        const response = await axios.post(`http://localhost:8000/forum/replies/${forumId}`, {
            id: forumId,
            createdAt: new Date().getTime(),
            message: inputValue,
            userId: docID,
        });
        console.log(response);
    }

    const handelPost = () => {
        console.log(inputValue);
        if (inputValue) {
            postReply();
        }
        setClickReply(false);
    }

    return (
        <div className="reply-box-container">
            <button className="cancel-button" onClick={() => setClickReply(false)}>Cancel</button>
            <div>
                <input type="text"
                    placeholder="Type a Response..."
                    className="reply-input"
                    onChange={(event) => setInputValue(event.target.value)}
                >
                </input>
                <button onClick={() => handelPost()} type="button" className="post-button">Post</button>
            </div>
        </div>
    )
}

export default ReplyBox