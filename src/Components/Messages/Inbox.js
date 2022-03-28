import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Inbox = ({ inboxMessage, receiverUsername }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (messageUsername, messageKnownAs) => {
    navigate(`/messages/${messageUsername}?messageKnownAs=${messageKnownAs}`);
  };

  return (
    <div className={`inbox-container ${receiverUsername ? 'conditional-hide' : ''} `}>
      <div className='inbox-label'>Inbox</div>
      {inboxMessage.map((m) => {
        const messageUsername =
          user?.username === m.senderUsername ? m.recipientUsername : m.senderUsername;
        const messageKnownAs =
          user?.knownAs === m.senderKnownAs ? m.recipientKnownAs : m.senderKnownAs;
        return (
          <div
            className='inbox-message-container'
            key={messageUsername}
            onClick={() => handleClick(messageUsername, messageKnownAs)}>
            <div className='message-avatar'></div>
            <div className='message-inner'>
              <div className='message-header'>
                <p className='message-sender'>
                  {user?.username === m.senderUsername
                    ? m.recipientKnownAs || m.recipientUsername
                    : m.senderKnownAs || m.senderUsername}
                </p>
                <p className='message-time'>
                  {m.dateSent ? moment(m.dateSent).format('MM/DD/YYYY') : ''}
                </p>
              </div>
              <p className='message-content'>{m.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
