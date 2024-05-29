import React from 'react'
import NavBar from '../components/NavBar.jsx';
import ChatCard from '../components/ChatCard.jsx';

const Inbox = () => {
  // chats in Firestore = [{
  //   messages: ["referenceToChat"],
  //   messengers: ["referenceToUser","referenceToUser"]
  // }]

  // using reference strings and queries
  // https://stackoverflow.com/questions/46568850/what-is-firebase-firestore-reference-data-type-good-for 
  // if chat.messengers contains user.id ()

  const chatsWithUser = [{
    id: "chatID1",
    recievers: [
      {
        username: "janedoe",
        profilepic: "https://pbs.twimg.com/profile_images/487911640147324928/3ZMfaTi8_400x400.jpeg"
      }
    ]
  },{
    id: "chatID2",
    recievers: [
      {
        username: "bob",
        profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
      }
    ]
  },{
    id: "chatID3",
    recievers: [
      {
        username: "dylan",
        profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg"
      }
    ]
  },{
    id: "chatID4",
    recievers: [
      {
        username: "dylan",
        profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg"
      },{
        username: "bob",
        profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
      }
    ]
  }]

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Inbox</h1>
        {chatsWithUser.map((chat) =>
          <ChatCard chat={chat} />
        )}
      </div>
    </>
  )
}

export default Inbox
