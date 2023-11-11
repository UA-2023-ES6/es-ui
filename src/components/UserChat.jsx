import React, { useState, useEffect, useRef } from 'react';
import { Message } from './Message';

const UserChat = () => {
  const [messages, setMessages] = useState([]);

  const messageContainerRef = useRef(null);

  const handleSendMessage = () => {
    const newMessage = {
      username: 'CurrentUser',
      content: 'New message content',
      timestamp: new Date(),
    };

    setMessages([newMessage, ...messages]);
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <input type="text" placeholder="Type your message..." style={{ marginBottom: '10px' }} />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export { UserChat };
