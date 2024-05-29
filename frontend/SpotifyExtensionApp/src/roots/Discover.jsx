import { useState, useEffect } from "react";
import React from 'react'
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar.jsx'
import ProfileCard from '../components/ProfileCard.jsx';
import axios from 'axios';
  
const Discover = () => {
  //fetch all users from Firestore and set to userData
  const [userData, setUserData] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8000/user");
    console.log("users: ", response.data);
    setUserData(response.data);
  };

  // const fetchMessages = async () => {
  //   const response = await axios.get("http://localhost:8000/chatmessages");
  //   console.log("all messages",response.data);
  //   setAllMessages(response.data);
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar />
      <div className="page-container">
        <div>
          <h1>Find Your Band</h1>
          <SearchBar placeholder="Search Spotify Users..."/>
        </div>
        <div>
          <h1 style={{marginTop: "100px"}}>Based On Your Groove</h1>
          <div className="user-cards-container">
            {userData && userData.map((user, index) => 
              <ProfileCard key={index} profileData={user} variant="user"/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover
