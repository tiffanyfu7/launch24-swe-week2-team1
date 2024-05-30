import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import ChatCard from '../components/ChatCard.jsx';
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from '../components/SearchBar.jsx';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext.jsx';
import '../styles/inbox.css';

const Inbox = () => {
  // const { userID } = useContext(AuthContext);
  // For John Johnson
  // const userID = "heSbXlYFOjsIL9XYO6ty";
  // For Jane Doe
  const userID = "McXs6673kv4Udhw7OenL";

  const [selectedChatId, setSelectedChatId] = useState("");
  const [chatData, setChatData] = useState(null);
  const [displayChats, setDisplayChats] = useState([]);
  const userChatIds = [];

  const fetchChatId = async (chatId) => {
    return await axios.get(`http://localhost:8000/chat/${chatId}`);
  }

  const fetchMessageId = async (messageId) => {
    return await axios.get(`http://localhost:8000/messages/${messageId}`);
  }

  const fetchUserId = async(userId) => {
    return await axios.get(`http://localhost:8000/users/${userId}`);
  }

  const fetchAllChats = async () => {
    const response = await axios.get("http://localhost:8000/chat");
    setChatData(response.data);
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  //find all chats current user is in
  //save all recievers of the chat
  const receivers = [];
  useEffect(() => {
    if (chatData) {
      chatData.forEach((chat) => {
        let messengers = chat.messengers;
        console.log("messengers", messengers)
        if (messengers.includes(userID)) {
          userChatIds.push(chat.id)
          for (var id of messengers) {
            if (id !== userID) {
              receivers.push(id);
            }
          }
        }
      })
    }
    console.log("userChatIds: ", userChatIds);
  }, [chatData])

  const chatsWithUser = []
  useEffect(() => {
    for (let chatId of userChatIds) {
      console.log("chatid: ", chatId);
      fetchChatId(chatId).then(tempChat => {
        console.log("tempchat: ", tempChat.data);

        fetchMessageId(tempChat.data.messages[tempChat.data.messages.length - 1]).then(tempMessage => {
          let lastMessage = "";
          let receiversArr = [];
          
          console.log("temp message: ", tempMessage.data)
          lastMessage = tempMessage.data.message;
          console.log(lastMessage);

          //this will get userId of reciever of LAST message, instead get user from chatId :,(
          // for (let userId of tempMessage.data.receiverId) {
          for (let userId of receivers) {
            fetchUserId(userId).then((tempUser) => {
              console.log("helllo")
              receiversArr.push({
                username: tempUser.data.username,
                profilepic: tempUser.data.profilepic,
              })

              chatsWithUser.push({
                id: chatId,
                receivers: receiversArr,
                recentmessage: lastMessage,
              })

              console.log("chatsWithUserAfter: ", chatsWithUser)
              setDisplayChats(chatsWithUser);
            })
          }
        })
      })
    }
  }, [userChatIds])

  // using reference strings and queries
  // https://stackoverflow.com/questions/46568850/what-is-firebase-firestore-reference-data-type-good-for
  // if chat.messengers contains user.id ()

  // 3. for each chat push to a new chatWithUser array
    // recievers: loop through messengers, add ids of messengers that aren't you (referenecId)
  // recent message: get last messageId in message array, find message of that messageId
  
  // const chatsWithUser1 = [{
  //   id: "chatID1",
  //   recievers: [
  //     {
  //       username: "janedoe",
  //       profilepic: "https://pbs.twimg.com/profile_images/487911640147324928/3ZMfaTi8_400x400.jpeg"
  //     }
  //   ],
  //   recentmessage: "Hey did you hear Taylor's new album?!"
  // },{
  //   id: "chatID4",
  //   recievers: [
  //     {
  //       username: "dylan",
  //       profilepic: "https://t3.ftcdn.net/jpg/00/52/82/66/360_F_52826677_DVtGDQwfQE6V8lgQ9BV5ytA57fDZ6ucS.jpg"
  //     },{
  //       username: "bob",
  //       profilepic: "https://www.orlandosentinel.com/wp-content/uploads/migration/2007/04/27/6QJF3UOGYZBH5JVUBO7FJIIRXE.jpg?w=620",
  //     }
  //   ],
  //   recentmessage: "We have to go to his concert!"
  // }]

  return (
    <>
      <NavBar />
  
      <div className="page-container">
        <div>
            <h1>Inbox</h1>
        </div> 
        {selectedChatId === "" && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '70px' }}>
              <SearchBar placeholder="Search Conversations..." />
              {/* <button
                style={{ marginLeft: '10px', padding: '12px', backgroundColor: '#F9BC60', color: 'black', border: 'none',
                  borderRadius: '5px', fontSize: '20px', cursor: 'pointer', textAlign: 'center', marginBottom: '6px', 
                }}
                className="filter-button"
              > Sort By </button> */}
          </div>
        )}

        {console.log("displaychats: ", displayChats)}

        {displayChats.length > 0 && selectedChatId === "" &&
          displayChats.map((chat) =>
            <ChatCard key={chat.id} chat={chat} setSelectedChatId={setSelectedChatId} />
          )
        }

        {selectedChatId !== "" &&
            <>
              <button 
                onClick={ () => setSelectedChatId("") }
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
              <h1 >You have entered chat {selectedChatId} </h1>
            </>
          
        }
      </div>
    </>
  )
}

export default Inbox;
