import { useState, useEffect, useContext } from "react";
import React from 'react'
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar.jsx'
import ProfileCard from '../components/ProfileCard.jsx';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext.jsx';
import '../styles/discover.css'
  
const Discover = () => {
  //fetch all users from Firestore and set to userData
  const [userData, setUserData] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8000/users");
    console.log("users: ", response.data);
    setUserData(response.data);
  };

  // const fetchMessages = async () => {
  //   const response = await axios.get("http://localhost:8000/chatmessages");
  //   console.log("all messages",response.data);
  //   setAllMessages(response.data);
  // };

  // const postUser = async () => {
  //   const response = await axios.post("http://localhost:8000/users");
  //   console.log("forums", response.data);
  //   // setForums(response.data);
  // };


  useEffect(() => {
    fetchUsers();
  }, []);

  const { userID, userName } = useContext(AuthContext);

  return (
    
    <>
      <NavBar />
      <div className="page-container">
        <div>
          <div>
            <h1>Find Your Band</h1>
            <SearchBar placeholder="Search Spotify Users..." />
          </div>
          <div>
            <a href="/UserProfile" userId={userID}>View Your Profile {userName}</a>
          </div>
        </div>
        <div>
          <h1 style={{marginTop: "100px"}}>Based On Your Groove</h1>
          <h3> {userID} </h3>
          <h3> {userName} </h3>
          <div className="user-cards-container">
            {userData && userData.map((user, index) =>
              ((user.id !== userID && user.public) ?
                <ProfileCard key={index} profileData={user} variant="user" />
                : null
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover
