import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Reply = ({ reply }) => {
    const [user, setUser] = useState(null);

    console.log(reply);

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8000/users/${reply.userId}`);
        console.log("user: ", response.data);
        setUser(response.data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const url = `/user/${reply.userId}`

    return (
        <>
            {user &&
                <>
                    <div className="reply-container">
                        <Link to={`/user/${reply.userId}`}>
                            <img className="reply-pp" src={user.profilepic} />
                        </Link>
                        <div style={{lineHeight: "1.5", marginTop:"10px"}}>
                            <p style={{fontWeight: "bold"}}>{user.username}: </p>
                            <p style={{ fontSize: "20px" }}>{reply.message}</p>
                        </div>
                    </div>
                </>
            }
        </>
  )
}

export default Reply