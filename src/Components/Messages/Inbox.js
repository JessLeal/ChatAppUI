import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import moment from 'moment';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

const Inbox = ({ inboxMessage, receiverUsername }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/messages?action=new`);
  };

  return (
    <div className={`inbox-container ${receiverUsername ? 'conditional-hide' : ''} `}>
      <div className='inbox-label-container'>
        <div className='inbox-label'>Inbox</div>
        <button className='message-new-button' title='New Message' onClick={handleClick}>
          <RateReviewOutlinedIcon />
        </button>
      </div>
      {inboxMessage.map((m) => {
        const messageUsername =
          user?.username === m.senderUsername ? m.recipientUsername : m.senderUsername;
        const messageKnownAs =
          user?.username === m.senderUsername ? m.recipientKnownAs : m.senderKnownAs;
        return (
          <NavLink
            className='inbox-message-container'
            key={messageUsername}
            to={`/messages/${messageUsername}?messageKnownAs=${messageKnownAs}`}
            // onClick={() => handleClick(messageUsername, messageKnownAs)}
          >
            <div className='avatar'></div>
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
          </NavLink>
        );
      })}
    </div>
  );
};

export default Inbox;
