import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import ChatCard from "../components/ChatCard.jsx";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../components/SearchBar.jsx";
import axios from "axios";
import { AuthContext } from "../components/AuthContext.jsx";
import "../styles/inbox.css";
import ChatBox from "../components/ChatBox.jsx";

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
  };

  const fetchMessageId = async (messageId) => {
    return await axios.get(`http://localhost:8000/messages/${messageId}`);
  };

  const fetchUserId = async (userId) => {
    return await axios.get(`http://localhost:8000/users/${userId}`);
  };

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
        console.log("messengers", messengers);
        if (messengers.includes(userID)) {
          userChatIds.push(chat.id);
          for (var id of messengers) {
            if (id !== userID) {
              receivers.push(id);
            }
          }
        }
      });
    }
    console.log("userChatIds: ", userChatIds);
  }, [chatData]);

  const chatsWithUser = [];
  useEffect(() => {
    if (userChatIds) {
      for (let chatId of userChatIds) {
        console.log("chatid: ", chatId);
        fetchChatId(chatId).then((tempChat) => {
          console.log("tempchat: ", tempChat.data);

          fetchMessageId(
            tempChat.data.messages[tempChat.data.messages.length - 1]
          ).then((tempMessage) => {
            let lastMessage = "";
            let receiversArr = [];

            console.log("temp message: ", tempMessage.data);
            lastMessage = tempMessage.data.message;
            console.log(lastMessage);

            //this will get userId of reciever of LAST message, instead get user from chatId :,(
            // for (let userId of tempMessage.data.receiverId) {
            for (let userId of receivers) {
              fetchUserId(userId).then((tempUser) => {
                console.log("helllo");
                receiversArr.push({
                  username: tempUser.data.username,
                  profilepic: tempUser.data.profilepic,
                });

                chatsWithUser.push({
                  id: chatId,
                  receivers: receiversArr,
                  recentmessage: lastMessage,
                });

                console.log("chatsWithUserAfter: ", chatsWithUser);
                setDisplayChats(chatsWithUser);
              });
            }
          });
        });
      }
    }
  }, [userChatIds]);

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Inbox</h1>

        {selectedChatId === "" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "70px",
            }}
          >
            <SearchBar placeholder="Search Conversations..." />
          </div>
        )}

        {console.log("displaychats: ", displayChats)}

        {displayChats.length > 0 &&
          selectedChatId === "" &&
          displayChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              setSelectedChatId={setSelectedChatId}
            />
          ))}

        {selectedChatId !== "" && (
          <>
            <button
              onClick={() => setSelectedChatId("")}
              className="back-button"
            >
              <FaArrowLeft color="white" size={45} />
            </button>
            <ChatBox chatId={selectedChatId} />
          </>
        )}
      </div>
    </>
  );
};

export default Inbox;

{
  /* <buttonstyle={{ marginLeft: '10px', padding: '12px', backgroundColor: '#F9BC60', color: 'black', border: 'none',
borderRadius: '5px', fontSize: '20px', cursor: 'pointer', textAlign: 'center', marginBottom: '6px'}}
className="filter-button"
> Sort By </button> */
}
