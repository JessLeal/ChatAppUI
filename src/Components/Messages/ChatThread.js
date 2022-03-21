import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import axiosBase from "../../API/axiosBase";
import { ReceiverChatMessage, SenderChatMessage } from "./ChatMessage";

const ChatThread = ({ chat }) => {
  // const [userMessages, setUserMessages] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { receiverUsername } = useParams();

  // useEffect(() => {
  //   const fetchUserMessages = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await axiosBase.get(`/messages/thread/${receiverUsername}`);
  //       setUserMessages(result.data);
  //     } catch (err) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUserMessages();
  // }, []);

  return (
    <div>
      <h2>{receiverUsername}</h2>
      <Grid container rowSpacing={1} direction='column'>
        {chat.map((message) => {
          return message.senderUsername === user.username ? (
            <SenderChatMessage key={message.id} message={message} />
          ) : (
            <ReceiverChatMessage key={message.id} message={message} />
          );
        })}
      </Grid>
    </div>
  );
};

export default ChatThread;
