import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { useSnackbar } from 'notistack';

import ChatThread from '../Components/Messages/ChatThread';
import MessageForm from '../Components/Messages/MessageForm';
import Inbox from '../Components/Messages/Inbox';
import SearchUser from '../Components/Messages/SearchUser';

import { startLoading, stopLoading } from '../Features/loadingSlice';
import axiosBase from '../API/axiosBase';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './MessagesPage.css';

const MessagesPage = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const [inboxMessage, setInboxMessage] = useState([]);
  const [action, setAction] = useState();
  const latestChat = useRef(null);
  const latestInbox = useRef(null);

  latestChat.current = chat;
  latestInbox.current = inboxMessage;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { receiverUsername } = useParams();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getMessage = async () => {
      dispatch(startLoading({ type: 'messages' }));
      try {
        const res = await axiosBase.get('/messages');

        if (res.status === 200) {
          return setInboxMessage(res.data);
        }
        enqueueSnackbar(`An error occured. Please contact site administrator`, {
          variant: 'error'
        });

        return setInboxMessage({});
      } finally {
        dispatch(stopLoading({ type: 'messages' }));
      }
    };

    getMessage();
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    setAction(searchParams.get('action'));
  }, [searchParams]);

  useEffect(() => {
    if (user.token) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_HUB_URL}/message?user=${receiverUsername}`, {
          accessTokenFactory: () => user.token,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();
      setConnection(newConnection);
    }
  }, [receiverUsername, user.token]);

  useEffect(() => {
    const startConnection = async () => {
      if (connection) {
        try {
          await connection.start();

          connection.on('ReceivedMessageThread', (messages) => {
            const updateChat = [...messages];
            setChat(updateChat);
          });

          connection.on('NewMessage', (message) => {
            const updateChat = [...latestChat.current, message];
            setChat([...new Set(updateChat)]);
          });

          connection.on('NewInboxMessage', (message) => {
            let updateInboxMessage = latestInbox?.current?.filter((m) => {
              return m.groupName !== message.groupName;
            });
            updateInboxMessage = [message, ...updateInboxMessage];
            setInboxMessage(updateInboxMessage);
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    startConnection();

    return function cleanup() {
      connection?.stop();
    };
  }, [connection]);

  const sendMessage = async (content) => {
    const chatMessage = {
      recipientUsername: receiverUsername,
      ...content
    };
    if (connection?._connectionStarted) {
      try {
        await connection.invoke('SendMessage', chatMessage);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('No Connection Started');
    }
  };

  return (
    <>
      {connection && (
        <div className='message-container'>
          <Inbox inboxMessage={inboxMessage} receiverUsername={receiverUsername} action={action} />
          <div
            className={`message-thread-container ${
              !receiverUsername && action !== 'new' ? 'conditional-hide' : ''
            }`}>
            {action === 'new' && <SearchUser />}
            {receiverUsername && (
              <>
                <div className='chat-thread-header'>
                  <ArrowBackIcon
                    className='chat-header-icon conditional-show'
                    onClick={() => {
                      return navigate('/messages');
                    }}
                  />
                  <div className='chat-thread-label'>
                    {searchParams.get('messageKnownAs') || receiverUsername}
                  </div>
                </div>
                <ChatThread chat={chat} receiverUsername={receiverUsername} />
                <MessageForm receiverUsername={receiverUsername} sendMessage={sendMessage} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesPage;
