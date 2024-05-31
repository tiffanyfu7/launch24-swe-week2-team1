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
                    <img className="reply-pp" src={user.profilepic} />
                    <div style={{lineHeight: "1.5", marginTop:"10px"}}>
                        <p style={{fontWeight: "bold"}}>{user.username}: </p>
                        <p style={{ fontSize: "20px" }}>{reply.message}</p>
                    </div>
                </div>
            }
        </>
  )
}

export default Reply