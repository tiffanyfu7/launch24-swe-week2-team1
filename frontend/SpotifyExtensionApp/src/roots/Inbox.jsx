import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import ChatCard from '../components/ChatCard.jsx';
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from '../components/SearchBar.jsx';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext.jsx';


const Inbox = () => {
  //const { userID } = useContext(AuthContext);
  const userID = "heSbXlYFOjsIL9XYO6ty";

  const [chatId, setChatId] = useState("");
  const [chatData, setChatData] = useState(null);
  const userChatIds = [];

  const fetchChats = async () => {
    const response = await axios.get("http://localhost:8000/chat");
    console.log("chats: ", response.data);
    setChatData(response.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chatData !== null) {
      chatData.forEach((chat) => {
        let messengers = chat.messengers;
        console.log(messengers)
        if (messengers.includes(userID)) {
          userChatIds.push(chat.id)
        }
      })
      console.log(userChatIds);
    }
  }, [chatData])

  useEffect(() => {
    if (userChatIds !== null) {
      for (const chatId in userChatIds) {
        //get the chat from 
      }
    }

  }, [userChatIds])
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
        <div>
            <h1>Inbox</h1>
        </div> 
        {chatId === "" && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '70px' }}>
              <SearchBar placeholder="Search by username..." />
              {/* <button
                style={{ 
                  marginLeft: '10px', 
                  padding: '12px',
                  backgroundColor: '#F9BC60',
                  color: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginBottom: '6px', 
                }}
                className="filter-button"
              >
                Sort By
              </button> */}
          </div>
        )}
        {chatId === "" ? (
            chatsWithUser.map((chat) =>
              <ChatCard key={chat.id} chat={chat} setChatId={setChatId}/>
            )
          ) : (
            <>
              <button 
                onClick={ () => setChatId("") }
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
              <h1 >You have entered chat {chatId} </h1>
            </>
          )
        }
      </div>
    </>
  )
}

export default Inbox;
