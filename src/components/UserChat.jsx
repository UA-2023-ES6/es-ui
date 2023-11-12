import React, { useState, useEffect, useRef } from 'react';
import { Message } from './Message';
import send_message_icon from "../imgs/UserChat/send_message_icon.png";

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        username: 'CurrentUser',
        content: newMessage,
        timestamp: new Date(),
      };

      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]); 

  /*
  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/endpoint');
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    fetchInitialMessages();
  }, []);
  */


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
            {[...messages].reverse().map((message) => (
                <Message key={message.username} {...message} />
            ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
                marginTop: '5px'
              }}
            />
            <img
              src={send_message_icon} // Replace with your image source
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
        </div>


    </div>
  );
};

export { UserChat };
