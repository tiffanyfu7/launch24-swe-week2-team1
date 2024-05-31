import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';
// import EditProfileModal from '../components/EditProfileModal';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UserProfileOther = ({ userId }) => {
  
  const { otherUserId } = useParams(); // getting other userId from URL

  const { userID, userName, docID } = useContext(AuthContext);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, setUserData] = useState(null);
  const [allTimeSongs, setAllTimeSongs] = useState(null);
  const [topArtistsYear, setTopArtistsYear] = useState(null);
  const [albums, setAlbums] = useState(null);

  // State for display preferences
  const [isPrivate, setIsPrivate] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

  const fetchUserData = async () => {
    // console.log('oioioiooii');
    const response = await axios.get('http://localhost:8000/users');
    console.log(response.data);
    const allUsers = response.data;
    // this line should filter the data to only have the correct user's document
    const user = allUsers.find(user => user.userid === otherUserId);
    console.log(user);
    if (user) {
        setUserData(user);
        setAllTimeSongs(user.allsongs);
        setTopArtistsYear(user.topArtistYear);
        setAlbums(user.savedalbums);
        setIsPrivate(!user.public);
    }
  }

  const handleToggle = async (currentFollowers) => {
    // add field to put URL
    const response = await axios.put(`http://localhost:8000/users`, {
        followercount: currentFollowers + 1
    });
  }
  

  useEffect(() => {
    fetchUserData();
  }, [otherUserId])

  const topSongs = [];
  const topArtists = [];
  const savedAlbums = []
  if (userData) {
    for (let i = 0; i < 4; i++) {
      topSongs.push(allTimeSongs[i]);
      topArtists.push(topArtistsYear[i]);
      savedAlbums.push(albums[i]);
    }
  }

  return (
    <>
      <a href="/Discover" className="back-button-link"> 
        <button className="profile-button" style={{width:"60px", height:"30px"}}> 
          <img src="/backarrow.png" alt="Back"></img>
        </button> 
      </a>
      <div className="main-container"> 
        <div className="profileContainer"> 
                {userData && userData.profilepic ? (
                  <div>
                    <img className="profilePic" src={userData.profilepic} alt="Profile Pic"></img>
                  </div>
                ) : (
                  <div className="profilePic"></div>
                )}
              <div className="profileBio"> 
                <h3> {userData && userData.username} </h3>
                <h6> {userData && userData.followercount} Followers * {userData && userData.followedArtistsCount} Artists Following </h6>
                {isPrivate ? ( <h6> Private </h6>) : ( <h6> Public </h6>)}
                <div className="button-container"> 
                  <button onClick={() => handleFollow(userData.followercount)} className="profile-button"> Follow </button>
                  <a href="/Inbox" style={{textDecoration:"none"}}> 
                    <button className="profile-button"> Message </button>
                  </a>
                </div>
              </div>
        </div>
    
        {!isPrivate && (
          <>
            <h4 className="content-header"> Top Liked Songs </h4> 
            <div className="content-container"> 
              {topSongs && topSongs.map((song) => (
                <div className="songs"> 
                  <img className="song-album-cover" src={song.albumimage} alt="album cover"></img>
                  <div className="song-text">
                    <div className="song-name"> 
                      {song.songname}
                    </div>
                    <div className="artist-name">
                      {song.artistname[0].name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h4 className="content-header"> Top Artists </h4>
            <div className="content-container"> 
            {topArtists && topArtists.map((artist) => (
              <div className="artists"> 
                <img className="artist-image" src={artist.artistimage}></img>
                <div className="song-name"> 
                  {artist.artistname}
                </div>
              </div>
            ))}
            </div>
            <h4 className="content-header"> Saved Albums </h4>
            <div className="content-container"> 
            {savedAlbums && savedAlbums.map((album) => (
            <div className="albums"> 
              <img src={album.albumimage} alt="Album cover" className="artist-image"></img>
              <div className="album-name"> 
                {album.albumname}
                <div className="artist-name" style={{fontWeight: "normal"}}> 
                  {album.artistname[0].name}
                </div>
              </div>
            </div>
            ))}
            </div>
        </>
        )}
      </div>
    </>
          
  );
}

export default UserProfileOther;