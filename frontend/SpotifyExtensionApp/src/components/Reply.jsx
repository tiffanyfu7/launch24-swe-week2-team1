import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Reply = ({ reply }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8000/users/${reply.userId}`);
        console.log("user: ", response.data);
        setUser(response.data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            {user &&
                <div className="reply-container">
                    <div className="reply-user-info">
                        <img className="reply-pp" src={user.profilepic} />
                        <p>{user.username}</p>
                    </div>
                    <p style={{fontSize: "20px"}}>{reply.message}</p>
                    <p>{reply.timestamp}</p>
                </div>
            }
        </>
  )
}

export default Reply