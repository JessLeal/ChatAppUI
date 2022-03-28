import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { ReceiverChatMessage, SenderChatMessage } from './ChatMessage';

const ChatThread = ({ chat }) => {
  const { user } = useSelector((state) => state.user);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className='chat-thread-container'>
      <div className='chat-messages'>
        {chat.map((message) => {
          return message.senderUsername === user.username ? (
            <SenderChatMessage key={message.id} message={message} />
          ) : (
            <ReceiverChatMessage key={message.id} message={message} />
          );
        })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatThread;
