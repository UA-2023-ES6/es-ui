import React, { useState, useEffect, useRef } from 'react';
import { Message } from './Message';

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
            height: '400px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px',
            }}
        >
            {[...messages].reverse().map((message) => (
            <Message key={message.username} {...message} />
            ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={handleInputChange}
                style={{ borderRadius: '5px', marginBottom: '10px', width: '600px', padding: '8px' }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    </div>
  );
};

export { UserChat };
