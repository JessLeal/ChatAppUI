import React from 'react';

export const SenderChatMessage = ({ message }) => {
  const { content } = message;
  return (
    <div className='chat-sender-container'>
      <div className='chat-sender'>
        <p className='chat-content'>{content}</p>
      </div>
    </div>
  );
};

export const ReceiverChatMessage = ({ message }) => {
  const { content } = message;
  return (
    <div className='chat-receiver-container'>
      <div className='chat-receiver'>
        <p className='chat-content'>{content}</p>
      </div>
    </div>
  );
};
