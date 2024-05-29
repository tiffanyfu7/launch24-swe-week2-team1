import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';
import ForumCard from '../components/ForumCard.jsx';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import '../styles/forum.css'

const Forum = () => {
  const [forumData, setForumData] = useState(null);
  const [individualForumId, setIndividualForumId] = useState(null);

  const fetchForums = async () => {
    try {
      const response = await axios.get("http://localhost:8000/forum");
      console.log("forums: ", response.data);
      setForumData(response.data);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const handleForumCardClick = (forumId) => {
    // Set the individual forum id
    setIndividualForumId(forumId);
  };

  const handleBackButtonClick = () => {
    // Reset the individual forum id to null
    setIndividualForumId(null);
  };

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Get The Scoop</h1>
        
        {individualForumId ? (
          <>
            <button 
              onClick={handleBackButtonClick}
              className="back-button" 
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '10px' 
              }}
            >
              <FaArrowLeft color="white" size={45} />
            </button>
            <h1>You have entered discussion {individualForumId} </h1>
          </>
        ) : (
          forumData &&
          forumData.map((forum) => (
            <div key={forum.id}>
              <ForumCard data={forum} handleForumCardClick={handleForumCardClick}/>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Forum;
