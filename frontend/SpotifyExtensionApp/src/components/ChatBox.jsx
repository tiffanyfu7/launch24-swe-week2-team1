import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Message from "./Message";
import { AuthContext } from "./AuthContext";

const ChatBox = ({ chatId }) => {
  // const { docID } = useContext(AuthContext)
  //get chat given chatId
  const [chatData, setChatData] = useState(null);
  const [message, setMessage] = useState(null);
  const userID = "tgbhyx06nvXxk1UtPmHx";
  const [time, setTime] = useState(null);

  let messages = [];

  const fetchChat = async () => {
    console.log("entering fetchChat2");
    const chatResponse = await axios.get(
      `http://localhost:8000/chat/${chatId}`
    );

    const chatResponseData = chatResponse.data;
    console.log(chatResponseData);

    for (var messageId of chatResponseData.messages) {
      var message = "",
        timestamp = "",
        username = "",
        profilepic = "";

      const messageResponse = await axios.get(
        `http://localhost:8000/messages/${messageId}`
      );

      const messageResponseData = messageResponse.data;

      message = messageResponseData.message;

      const rawDate = messageResponseData.date;
      const milliseconds =
        rawDate.nanoseconds / 1000000 + rawDate.seconds * 1000;
      const date = new Date(milliseconds);
      const formattedDate = date.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
      const formattedTime = date.toLocaleTimeString("en-GB"); // Format as HH:MM:SS
      const newDate = formattedDate + " " + formattedTime;
      timestamp = newDate;

      const userResponse = await axios.get(
        `http://localhost:8000/users/${messageResponseData.senderId}`
      );

      const userResponseData = userResponse.data;
      username = userResponseData.username;
      profilepic = userResponseData.profilepic;

      let messageToPush = {
        message: message,
        timestamp: timestamp,
        username: username,
        profilepic: profilepic,
      };

      messages.push(messageToPush);
    }
    console.log("messages array out of for loop", messages);

    setChatData(messages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var curChatId = "chat/hTec14wd5pSZxNQwanR7"
    const body = {
      chatId: curChatId,
      date: time,
      message: message,
      senderId: userID,
    };

    await axios.post(
      "http://localhost:8000/messages/hTec14wd5pSZxNQwanR7",
      body
    );

    fetchChat();

    setMessage("");
  };

  
  const handleChange = (e) => {
    setMessage(e.target.value);
    updateCurrentTime();
};

const updateCurrentTime = () => {
    setTime(new Date().toLocaleString());
};

  //   loop thorugh messages field in chat
  //   push to an array all the message

  return (
    <>
      {/* <h1>You have entered chat {chatId} </h1> */}
      <div className="messages-container">
        {chatData &&
          chatData.map((chatMessage, index) => (
            <Message key={index} message={chatMessage} />
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        
        <div className="formfield-new">
          <label id="form">Message: &nbsp;</label>
          <textarea
            type="text"
            defaultValue={message}
            onChange={handleChange}
            style={{ height: "100px" }}
          ></textarea>
        </div>

        <br></br>
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatBox;
