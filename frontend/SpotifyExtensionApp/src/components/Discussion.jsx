import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Reply from './Reply';

const Discussion = ({ forumId }) => {
    const [forumData, setForumData] = useState(null);

    const fetchForum = async () => {
        const response = await axios.get(`http://localhost:8000/forum/${forumId}`);
        console.log("forum: ", response.data);
        setForumData(response.data);
    };

    useEffect(() => {
        fetchForum();
    }, []);

    return (
        <>
            {/* <h1>You have entered discussion {forumId} </h1> */}
            {forumData &&
                <div>
                    <div className="discussion-title-card">
                        <img className="discussion-album-cover" width="200px" height="200px" src={forumData.albumcover} />
                        <div className="artist-message">
                            <p style={{ fontSize: "40px" }}>{forumData.albumname} by {forumData.artistmessage.name}</p>
                            <span style={{ fontSize: "30px", backgroundColor:"#F9BC60", padding:"3px" }}>
                                🌟From {forumData.artistmessage.name}: {forumData.artistmessage.message}
                            </span>
                        </div>
                        <div className="like-and-reply" >
                            <h4>Likes: {forumData.likes} </h4> {/*add like button*/}
                            <button className="reply-button">Reply</button>
                        </div>
                    </div>
                    <h1 style={{margin: "20px 0px 8px 10px"}}>Replies</h1>
                    <div className="replies-container">
                        {forumData.replies.map((reply, index) => 
                            <Reply key={index} reply={reply} />
                        )}
                    </div>
                </div>
            }
        </>
  )
}

export default Discussion