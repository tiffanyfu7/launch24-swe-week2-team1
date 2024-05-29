import React, { useState } from 'react'
import NavBar from '../components/NavBar.jsx';
import ChatCard from '../components/ChatCard.jsx';

const Inbox = () => {
  const [chatId, setChatId] = useState("");
  // chats in Firestore = [{
  //    id: "id"
  //   messages: ["referenceToChat"],
  //   messengers: ["referenceToUser","referenceToUser"]
  // }]

  // using reference strings and queries
  // https://stackoverflow.com/questions/46568850/what-is-firebase-firestore-reference-data-type-good-for
  // if chat.messengers contains user.id ()

  // 1. see if our referenceid is in the chat
  // 2. get subset of chats we are in
  // 3. for each chat push to a new chatWithUser array
    // recievers: loop through messengers, add ids of messengers that aren't you (referenecId)
  // recent message: get last messageId in message array, find message of that messageId
  
  
  const chatsWithUser = [{
    id: "chatID1",
    recievers: [
      {
        username: "janedoe",
        profilepic: "https://pbs.twimg.com/profile_images/487911640147324928/3ZMfaTi8_400x400.jpeg"
      }
    ],
    recentmessage: "Hey did you hear Taylor's new album?!"
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
    ],
    recentmessage: "We have to go to his concert!"
  }]

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Inbox</h1>
        {chatId == "" ?
            chatsWithUser.map((chat) =>
              <ChatCard chat={chat} setChatId={setChatId}/>
            )
          :
          <h1>You have entered chat {chatId}</h1>
        }
      </div>
    </>
  )
}

export default Inbox
