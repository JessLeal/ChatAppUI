import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import moment from 'moment';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

import Loading from '../Loading/Loading';

const Inbox = ({ inboxMessage, receiverUsername, action }) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.isLoading);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/messages?action=new`);
  };

  return (
    <div
      className={`inbox-container ${
        receiverUsername || action === 'new' ? 'conditional-hide' : ''
      } `}>
      <div className='inbox-label-container'>
        <div className='inbox-label'>Inbox</div>
        <button className='message-new-button' title='New Message' onClick={handleClick}>
          <RateReviewOutlinedIcon />
        </button>
      </div>
      <div className='inbox-messages-container'>
        <Loading />

        {!isLoading.messages && (
          <>
            {Object.keys(inboxMessage).length === 0 ? (
              <div className='empty-inbox-message'>No messages</div>
            ) : (
              <>
                {inboxMessage.map((m) => {
                  let messageUsername, messageKnownAs, messagePhoto;
                  if (user?.username === m.senderUsername) {
                    messageUsername = m.recipientUsername;
                    messageKnownAs = m.recipientKnownAs;
                    messagePhoto = m.receiverPhotoUrl;
                  } else {
                    messageUsername = m.senderUsername;
                    messageKnownAs = m.senderKnownAs;
                    messagePhoto = m.senderPhotoUrl;
                  }

                  return (
                    <NavLink
                      className='inbox-message-container'
                      key={`${m.senderUsername}-${m.recipientUsername}`}
                      to={`/messages/${messageUsername}?messageKnownAs=${messageKnownAs}`}>
                      <img
                        className='avatar'
                        src={messagePhoto || `${process.env.PUBLIC_URL}/images/user.png`}
                        alt={`${messageUsername}-avatar`}
                      />
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
