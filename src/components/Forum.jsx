import React, { useState, useEffect } from 'react';
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroup, 
  MDBListGroupItem,
} from 'mdb-react-ui-kit';


const SERVER_API = "http://localhost:5000/api"

const Forum = ({id}) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [activeItem, setActiveItem] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(-1);
    const [newAnswer, setNewAnswer] = useState('')
    const [questionAnswers, setQuestionAnswers] = useState({});

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
      if (response.ok) {
        const data = await response.json();
        const newMessages = extractContent(data);
        setQuestions(newMessages);

        for (const q of newMessages) {
          const answers = await fetchAnswersForQuestion(q.questionId);
          setQuestionAnswers((prevQuestionAnswers) => ({ ...prevQuestionAnswers, ...answers }));
        }
      } else {
        console.error('Failed to fetch new questions. Server responded with:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching new questions:', error);
    }
  };

  const fetchAnswersForQuestion = async (questionId) => {
    try {
      const response = await fetch(`${SERVER_API}/Answer/question/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        return { [questionId]: data.data };
      } else {
        console.error(`Failed to fetch answers for question ID ${questionId}. Server responded with:`, response.status, response.statusText);
        return { [questionId]: [] };
      }
    } catch (error) {
      console.error(`Error fetching answers for question ID ${questionId}:`, error);
      return { [questionId]: [] };
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

  const closeModal = () => {
    console.log(questions)
    console.log(questionAnswers)
    console.log(selectedQuestion)
    setNewAnswer('')
    setSelectedQuestion(-1)
    setShowModal(false)
  };

  const openModal = (questionId) => {
    setSelectedQuestion(questionId)
    setShowModal(true)
  };

  const handleAddAnswer = async () => {
    if (newAnswer.trim() !== '') {
      const answer = {
        "content": newAnswer,
        "questionId": selectedQuestion,
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa7", // change later when login is connected to main page
      };
  
      try {
        const response = await fetch(`${SERVER_API}/Answer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answer),
        });
  
        if (response.ok) {
          const data = await response.json();
  
          if (Array.isArray(data) && data.length > 0) {
            console.log('New answer added:', data);
            setQuestionAnswers((prevQuestionAnswers) => ({
              ...prevQuestionAnswers,
              [selectedQuestion]: [...(prevQuestionAnswers[selectedQuestion] || []), data],
            }));
          } else {
            console.log('No answer data returned from the API for questionId='+selectedQuestion);
          }
          closeModal();
        } else {
          console.error('Failed to add answer. Server responded with:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error adding answer:', error);
      }
    }
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
              
              <MDBListGroup style={{ minWidth: '22rem' }} light small>
                {questionAnswers[q.questionId]?.map((answer, answerIndex) => (
                  <MDBListGroupItem key={answerIndex}>{answer.content}</MDBListGroupItem>
                ))}
              </MDBListGroup>
              
              <div style={{ padding: '10px', marginBottom: '5px' }}>
                  <button onClick={() => openModal(q.questionId)}>Add Answer</button>
              </div>

            </MDBAccordionItem>
          ))}
        </MDBAccordion>

        <MDBModal open={showModal} onClosePrevented={closeModal} tabIndex='-1' staticBackdrop>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add Answer</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <textarea
                  style={{ width: '100%', height: '150px', resize: 'none' }}
                  placeholder="Enter your answer..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={closeModal}>
                  Cancel
                </MDBBtn>
                <MDBBtn onClick={() => handleAddAnswer(selectedQuestion)}>
                  Add
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
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