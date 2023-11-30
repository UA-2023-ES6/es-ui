import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './Message';
import send_message_icon from "../imgs/UserChat/send_message_icon.png";
import {postData,getData} from "../utils/httpRequests";

const SERVER_API = `${process.env.REACT_APP_SERVER_API}/api`

const UserChat = ({id,token}) => {
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
  
      if(token == null || token == "")
      {
        console.log("token is null")
      }
      else{
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
      
        // fetch(`${SERVER_API}/Message`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(message),
        // }).then().catch(err => console.log(err));
  
        // if (response.ok) {
        //   try {
        //     const response = await fetch(`${SERVER_API}/Message/group/${id}`);
        //     const data = await response.json();
        //     const all_messages = extractContent(data)
        //     //console.log("all_messages:",all_messages)
        //     setMessages(all_messages);
        //   } catch (error) {
        //     console.error('Error fetching initial messages:', error);
        //   }
        //   setNewMessage('');
        //   //console.log("All messages:",messages)
        // } else {
        // }
    }
  };
  

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages,token]); 

  const fetchNewMessages = useCallback(async () => {
    if(token == null || token == "")
    {
      console.log("token is null")
    }
    else {
      getData(`${SERVER_API}/Message/group/${id}`,token)
      .then(data => {
        setMessages(extractContent(data))
      })
      .catch(err => console.log(err))
    }
    // try {
    //   const response = await fetch(`${SERVER_API}/Message/group/${id}`);
    //   const data = await response.json();
    //   const newMessages = extractContent(data);
    //   setMessages(newMessages);
    // } catch (error) {
    //   console.error('Error fetching new messages:', error);
    // }
  }, [id,token]);

  useEffect(() => {
    if(token == null || token == "")
    {
      console.log("token is null")
    }
    else {
      fetchNewMessages();
    }
  }, [fetchNewMessages,token]);

  useEffect(() => {
    if(token == null || token == "")
    {
      console.log("token is null")
    }
    else {
      const intervalId = setInterval(() => {
        fetchNewMessages();
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [id,fetchNewMessages,token]);


  useEffect(() => {
    if(token == null || token == "")
    {
      console.log("token is null")
    }
    else {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
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
