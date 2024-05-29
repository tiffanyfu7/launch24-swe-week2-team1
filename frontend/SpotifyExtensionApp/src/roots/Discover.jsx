import { useState, useEffect } from "react";
import React from 'react'
import NavBar from '../components/NavBar.jsx';
import axios from "axios";

const Discover = () => {
  const [allSongs, setAllSongs] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/user");
    console.log("response", response.data);
    setAllSongs(response.data);
  };

  const fetchMessages = async () => {
    const response = await axios.get("http://localhost:5000/user");
    console.log("response", response.data);
    setAllSongs(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Discover
