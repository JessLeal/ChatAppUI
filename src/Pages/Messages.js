import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatThread from "../Components/Messages/ChatThread";
import MessageForm from "../Components/Messages/MessageForm";

const Messages = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  const { user } = useSelector((state) => state.user);
  const { receiverUsername } = useParams();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:5001/hubs/message?user=${receiverUsername}`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [receiverUsername, user.token]);

  useEffect(() => {
    const startConnection = async () => {
      if (connection) {
        try {
          await connection.start();

          connection.on("ReceivedMessageThread", (messages) => {
            const updateChat = [...messages];
            setChat(updateChat);
          });

          connection.on("NewMessage", (message) => {
            const updateChat = [...latestChat.current, message];
            setChat(updateChat);
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    startConnection();
  }, [connection]);

  const sendMessage = async (content) => {
    const chatMessage = {
      recipientUsername: receiverUsername,
      ...content,
    };
    if (connection?._connectionStarted) {
      try {
        await connection.invoke("SendMessage", chatMessage);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No Connection Started");
    }
  };

  return (
    <div>
      <ChatThread chat={chat} />
      <MessageForm receiverUsername={receiverUsername} sendMessage={sendMessage} />
    </div>
  );
};

export default Messages;
