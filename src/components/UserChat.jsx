import React, { useState, useEffect, useRef } from 'react';
import { Message } from './Message';
import send_message_icon from "../imgs/UserChat/send_message_icon.png";

const SERVER_API = "http://localhost:5000/api"

const UserChat = ({id}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const message = {
        "content": newMessage,
        "groupId": id,
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa7", // change later when login is connected to main page
      };
  
      try {
        const response = await fetch(`${SERVER_API}/Message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
  
        if (response.ok) {
          try {
            const response = await fetch(`${SERVER_API}/Message/group/${id}`);
            const data = await response.json();
            const all_messages = extractContent(data)
            //console.log("all_messages:",all_messages)
            setMessages(all_messages);
          } catch (error) {
            console.error('Error fetching initial messages:', error);
          }
          setNewMessage('');
          //console.log("All messages:",messages)
        } else {
          console.error('Failed to send message. Server responded with:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]); 

  const fetchNewMessages = async () => {
    try {
      const response = await fetch(`${SERVER_API}/Message/group/${id}`);
      const data = await response.json();
      const newMessages = extractContent(data);
      setMessages(newMessages);
    } catch (error) {
      console.error('Error fetching new messages:', error);
    }
  };

  useEffect(() => {
    fetchNewMessages();
  }, [id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNewMessages();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);


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

function extractContent(json) {
  return json.data.map(item => ({
    messageId: item.id,
    content: item.content,
    createDate: new Date(item.createDate),
    username: item.senderName
  }));
}

export { UserChat };
