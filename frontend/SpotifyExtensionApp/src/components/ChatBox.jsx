import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "./Message";

const ChatBox = ({ chatId }) => {
  //get chat given chatId
  console.log("chatId", chatId);
  const [chatData, setChatData] = useState(null);
  const messages1 = [
    {
      message: "hi",
      timestamp: "12",
      username: "tom",
      profilepic:
        "https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png",
    },
    {
      message: "hello!",
      timestamp: "13",
      username: "jefferson",
      profilepic:
        "https://i.guim.co.uk/img/media/6bb1314dbe7b5b178616018f3096c0477790956f/0_982_5000_3000/master/5000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=99e046ea15b6e520475cf112f1de5d34",
    },
  ];

  let messages = [];
  const fetchChat = async () => {
    const chatResponse = await axios
      .get(`http://localhost:8000/chat/${chatId}`)
      .then((c) => {
        for (var messageId of c.data.messages) {
          var message = "",
            timestamp = "",
            username = "",
            profilepic = "";
          const messageResponse = axios
            .get(`http://localhost:8000/messages/${messageId}`)
            .then((m) => {
              message = m.data.message;
              timestamp = m.data.timestamp; //convert later

              console.log("message", message);
              console.log("m.data.message", m.data.message);

              const userResponse = axios
                .get(`http://localhost:8000/users/${m.data.senderId}`)
                .then((u) => {
                  username = u.data.username;
                  profilepic = u.data.profilepic;
                });
            });

          messages.push({
            message: message,
            timestamp: timestamp,
            username: username,
            profilepic: profilepic,
          });

          console.log("entering for loop");
          console.log("messages in for loops", messages);

        }

      });



    //   console.log("messages", c.data);
    console.log("chat response", chatResponse);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  // useEffect(() => {
  //   if (chatData) {
  //     console.log("chat data", chatData);
  //   }
  // }, [chatData]);


//   loop thorugh messages field in chat
//   push to an array all the message

  return (
    <>
      {/* <h1>You have entered chat {chatId} </h1> */}
      <div className="messages-container">
        {/* {chatData &&
          chatData.length > 0 &&
          chatData.map((chatMessage) => <Message message={chatMessage} />)} */}

        {chatData &&
          chatData.map((chatMessage) =>
            console.log("chatMessage", chatMessage.messages)
          )}
      </div>
    </>
  );
};

export default ChatBox;
