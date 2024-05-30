import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar.jsx';
import { AuthContext } from '../components/AuthContext.jsx';
import axios from 'axios';


const Library = () => {
  const [userData, setUserData] = useState(null);
  const [savedSongs, setSavedSongs] = useState(null);
  const [topArtstists, setTopArtists] = useState(null);
  //const { userID } = useContext(AuthContext);

  // Testing For John Johnson (https://console.firebase.google.com/u/0/project/spotify-week-2/firestore/databases/-default-/data/~2Fusers~2FMcXs6673kv4Udhw7OenL)
  const userID = "heSbXlYFOjsIL9XYO6ty"

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:8000/users/${userID}`);
    setUserData(response.data);
    setSavedSongs(response.data.allsongs);
    setTopArtists(response.data.topartists);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Your Library</h1>
      </div>
    </>
  )
}

export default Library