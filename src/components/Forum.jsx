import React, { useState, useEffect } from 'react';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const SERVER_API = "http://localhost:5000/api"

const Forum = ({id}) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [activeItem, setActiveItem] = useState(-1);

  const handleSendQuestion = async () => {
    if (newQuestion.trim() !== '') {
      const question = {
        "content": newQuestion,
        "groupId": id,
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa7", // change later when login is connected to main page
      };
  
      try {
        const response = await fetch(`${SERVER_API}/Question`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question),
        });
  
        if (response.ok) {
          try {
            const response = await fetch(`${SERVER_API}/Question/group/${id}`);
            const data = await response.json();
            const allQuestions = extractContent(data);
            setQuestions(allQuestions);
            console.log("All questions:",allQuestions)
          } catch (error) {
            console.error('Error fetching initial questions:', error);
          }
          setNewQuestion('');
        } else {
          console.error('Failed to send question. Server responded with:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending question:', error);
      }
    }
  };

  const fetchNewQuestions = async () => {
    try {
      const response = await fetch(`${SERVER_API}/Question/group/${id}`);
      const data = await response.json();
      const newMessages = extractContent(data);
      setQuestions(newMessages);
    } catch (error) {
      console.error('Error fetching new questions:', error);
    }
  };

  useEffect(() => {
    fetchNewQuestions();
  }, [id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNewQuestions();
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  const toggleAccordionItem = (index) => {
    setActiveItem((prevActiveItem) => (prevActiveItem === index ? -1 : index));
  };

  const addAnswer = (questionId, newAnswer) => {
    
  };

  const toggleAnswer = (questionId, answerIndex) => {
    
  };

  return (
    <div>
      <div style={{
        height: '70vh',
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
        <MDBAccordion alwaysOpen active={activeItem} onChange={(itemId) => setActiveItem(itemId)} flush>
          {questions.map((q,index) => (
            <MDBAccordionItem 
                key={q.questionId} 
                collapseId={index} 
                headerTitle={q.content}
            >
              <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <button onClick={() => addAnswer(q.questionId, 'New Answer')}>
                  Add Answer
                </button>
              </div>
              {q.answers && q.answers.map((answer, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                  }}
                  onClick={() => toggleAnswer(q.questionId, index)}
                >
                  {answer.show && <div>{answer.content}</div>}
                </div>
              ))}
            </MDBAccordionItem>
          ))}
        </MDBAccordion>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ position: 'relative', width: '600px' }}>
          <input
            type="text"
            placeholder="Add a new question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendQuestion();
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
              marginBottom: '5px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

function extractContent(json) {
    return json.data.map(item => ({
      questionId: item.id,
      content: item.content,
      createDate: new Date(item.createDate),
      username: item.senderName
    }));
  }

export { Forum };
