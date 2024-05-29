import React from 'react'
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar.jsx'
import ProfileCard from '../components/ProfileCard.jsx';
  
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
              <ProfileCard key={index} data={user} variant="user"/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover
