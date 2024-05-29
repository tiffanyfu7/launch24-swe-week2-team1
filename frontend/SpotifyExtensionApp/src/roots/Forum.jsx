import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';
import ForumCard from '../components/ForumCard.jsx';

const Forum = () => {
  
  const [forumData, setForumData] = useState(null);
  const fetchForums = async () => {
    const response = await axios.get("http://localhost:8000/forum");
    console.log("forums: ", response.data);
    setForumData(response.data);
  };

  useEffect(() => {
    fetchForums();
  }, []);
  
  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Get The Scoop</h1>
        {forumData &&
          forumData.map((forum) => 
            <ForumCard data={forum} />
          )
        }
      </div>
    </>
  )
}

export default Forum
