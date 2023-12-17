import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './Message';
import send_message_icon from "../imgs/UserChat/send_message_icon.png";
import {postData,getData} from "../utils/httpRequests";

const SERVER_API = `${process.env.REACT_APP_SERVER_API}api`

const UserChat = ({id,token,username,permission}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if(token !== null && token !== ""){
      if (newMessage.trim() !== '') {
        const message = {
          "content": newMessage,
          "groupId": id,
          "userId": username,
        };
    
          postData(`${SERVER_API}/Message`,token,message)
          .then(response => {
              getData(`${SERVER_API}/Message/group/${id}`,token)
              .then(data => {
                setMessages(extractContent(data))
              })
              .catch(err => {
                console.log(err)
              })
              setNewMessage('');
          })
          .catch(err => console.log(err))
      }
    }
  };
  

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages,token]); 

  const fetchNewMessages = useCallback(async () => {
    if(token !== null && token !== "") {
      getData(`${SERVER_API}/Message/group/${id}`,token)
      .then(data => {
        setMessages(extractContent(data))
      })
      .catch(err => console.log(err))
    }
  }, [id,token]);

  useEffect(() => {
    if(token !== null && token !== "") {
      fetchNewMessages();
    }
  }, [fetchNewMessages,token]);

  useEffect(() => {
    if(token !== null && token !== "") {
      const intervalId = setInterval(() => {
        fetchNewMessages();
        console.log("here:",permission)
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [id,fetchNewMessages,token]);


  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div>
        <div
            ref={messageContainerRef}
            style={{
                height: '70vh', // if there are any vertical scroll appearing without need set this to 500px
                overflowY: 'scroll',
                borderLeft: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
                borderRight: '1px solid #ccc',
                padding: '10px',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                marginBottom: '10px',
            }}
            >
            {[...messages].map((message) => (
                <Message key={message.messageId} {...message} />
            ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {permission && (
              <div style={{ position: 'relative', width: '600px' }}>
                <textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  style={{
                    borderRadius: '5px',
                    width: '100%',
                    height: '37px',
                    paddingLeft: '8px',
                    resize: 'none',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    marginTop: '0px'
                  }}
                />
                <img
                  src={send_message_icon}
                  alt="Send"
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: -50,
                    bottom: '50%',
                    transform: 'translateY(50%)',
                  }}
                  onClick={handleSendMessage}
                />
              </div>    
            )}
        </div>


    </div>
  );
};

function extractContent(json) {
  return json.data.map(item => ({
    messageId: item.id,
    content: item.content,
    createDate: new Date(item.createDate),
    username: item.senderName
  }));
}

export { UserChat };
