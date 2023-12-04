import React, { useState, useEffect, useCallback } from 'react';
import add_answer_icon from "../imgs/Forum/add_answer_icon.png";
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
import {postData,getData} from "../utils/httpRequests";


const SERVER_API = `${process.env.REACT_APP_SERVER_API}/api`

const Forum = ({id,token}) => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [activeItem, setActiveItem] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(-1);
    const [newAnswer, setNewAnswer] = useState('')
    const [questionAnswers, setQuestionAnswers] = useState({});

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    filterQuestions(searchTerm);
  };

  const filterQuestions = (term) => {
    if (term.trim() === '') {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter((question) =>
        question.content.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  };

  useEffect(() => {
    filterQuestions(searchTerm);
  }, [questions, searchTerm]);


  const handleSendQuestion = async () => {
    if(token != null && token != "") {
      if (newQuestion.trim() !== '') {
        const question = {
          "content": newQuestion,
          "groupId": id,
          "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa7", // change later when login is connected to main page
        };
    
        postData(`${SERVER_API}/Question`,token,question)
        .then(data => {
          getData(`${SERVER_API}/Question/group/${id}`,token)
          .then(data => {
            setQuestions(extractContent(data))
          })
          .catch(err => console.log(err))
          setNewQuestion("")
        })
        .catch(err => console.log(err))
      }
    }
  };

  const fetchNewQuestions = useCallback(async () => {
    if(token != null && token != "") {
      const data = await getData(`${SERVER_API}/Question/group/${id}`,token)
      setQuestions(extractContent(data));

      for (const q of extractContent(data)) {
        console.log("q:", q);
        console.log("questionsAnswers:",questionAnswers);
        const answers = await fetchAnswersForQuestion(q.questionId)
        console.log("answers:",answers)
        setQuestionAnswers(prevQuestionAnswers => ({
                          ...prevQuestionAnswers,
                          [q.questionId]: answers,
                          })); 
      }
    }
  }, [id,token]);
  
  useEffect(() => {
    fetchNewQuestions();
  }, [fetchNewQuestions,token]);

  const fetchAnswersForQuestion = async (questionId) => {
    try {
      if (token != null && token != "") {
        const data = await getData(`${SERVER_API}/Answer/question/${questionId}`, token);
        console.log("data:", data);
        return data.data;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNewQuestions();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id,fetchNewQuestions,token]);

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
    if(token != null && token != "") {
      if (newAnswer.trim() !== '') {
        const answer = {
          "content": newAnswer,
          "questionId": selectedQuestion,
          "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa7", // change later when login is connected to main page
        };  
        postData(`${SERVER_API}/Answer`,token,answer) 
        closeModal();
      }
    }
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Search for a question..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
        }}
      />
      
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
          {filteredQuestions.map((q,index) => (
            <MDBAccordionItem 
              key={q.questionId} 
              collapseId={index} 
              headerTitle={
                <div>
                  <p>
                    <strong style={{ fontSize: '16px' }}>{"teste2"}</strong> <span style={{ fontSize: '10px' }}>{q.createDate.toLocaleString()}</span>
                  </p>
                  <p style={{ fontSize: '20px' }}>{q.content}</p>
                </div>
              }
            >
              
              <MDBListGroup style={{ minWidth: '22rem' }} light small>
                {questionAnswers[q.questionId]?.map((answer, answerIndex) => (
                  <MDBListGroupItem key={answerIndex}>
                    <div>{"> " + answer.content}</div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 'bold', fontsize: '8px' }}>{"teste2"}</span> 
                      <span style={{ marginLeft: '8px', fontSize: 'smaller' }}>{new Date(answer.createDate).toLocaleString()}</span>
                    </div>
                  </MDBListGroupItem>
                ))}
                <MDBListGroupItem style={{ 
                  backgroundColor: '#f0f0f0',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  }}>
                  <div
                    style={{ textAlign: 'center', fontWeight: 'bold', cursor: 'pointer',marginLeft: '5px' }}
                    onClick={() => openModal(q.questionId)}
                  >
                    {"Add New Answer"}
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
              
              

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
                  style={{ width: '100%', height: '150px', resize: 'none', }}
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
          <textarea
            placeholder="Add a new question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
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
              marginTop: '0px'
            }}
          />
          <img
            src={add_answer_icon}
            alt="Send"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              width: '45px',
              height: '45px',
              transform: 'translateY(-10%)',
            }}
            onClick={handleSendQuestion}
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
