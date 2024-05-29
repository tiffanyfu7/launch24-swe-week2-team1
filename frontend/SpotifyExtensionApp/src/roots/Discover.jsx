import { useState, useEffect } from "react";
import React from 'react'
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar.jsx'
import ProfileCard from '../components/ProfileCard.jsx';
import axios from 'axios';
  
const Discover = () => {

  //fetch all users from Firestore and set to userData
  const users = [{
    profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
    username: "bob",
    id: "hAjwoNjelw"
  },{
    profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg",
    username: "dylan",
    id: "KewAiorOenwl"
  },{
    profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
    username: "bob",
    id: "hAjwoNjelw"
  },{
    profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg",
    username: "dylan",
    id: "KewAiorOenwl"
  },{
    profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
    username: "bob",
    id: "hAjwoNjelw"
  },{
    profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg",
    username: "dylan",
    id: "KewAiorOenwl"
  },{
    profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
    username: "bob",
    id: "hAjwoNjelw"
  },{
    profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg",
    username: "dylan",
    id: "KewAiorOenwl"
  }
  ]

  const [allSongs, setAllSongs] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [forums, setForums] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8000/user");
    console.log("all songs",  response.data);
    setAllSongs(response.data);
  };

  const fetchMessages = async () => {
    const response = await axios.get("http://localhost:8000/chatmessages");
    console.log("all messages",response.data);
    setAllMessages(response.data);
  };

  const fetchForums = async () => {
    const response = await axios.get("http://localhost:8000/forum");
    console.log("forums", response.data);
    setForums(response.data);
  };


  const postUser = async () => {
    const response = await axios.post("http://localhost:8000/user");
    console.log("forums", response.data);
    // setForums(response.data);
  };


  useEffect(() => {
    fetchUsers();
    fetchMessages();
    fetchForums();
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
            {users.map((user, index) => 
              <ProfileCard key={index} profileData={user} variant="user"/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover
