import React, { useState } from 'react';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      const updatedQuestions = [
        ...questions,
        { id: questions.length + 1, question: newQuestion, answers: [] },
      ];
      setQuestions(updatedQuestions);
      setNewQuestion('');
    }
  };

  const addAnswer = (questionId, newAnswer) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, answers: [...q.answers, { content: newAnswer, show: true }] } : q
    );
    setQuestions(updatedQuestions);
  };

  const toggleAnswer = (questionId, answerIndex) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, answers: q.answers.map((ans, index) => (index === answerIndex ? { ...ans, show: !ans.show } : ans)) } : q
    );
    setQuestions(updatedQuestions);
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
        <MDBAccordion>
          {questions.map((q) => (
            <MDBAccordionItem key={q.id} collapseId={`collapse${q.id}`} headerTitle={q.question}>
              <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <button onClick={() => addAnswer(q.id, 'New Answer')}>
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
                  onClick={() => toggleAnswer(q.id, index)}
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
                addQuestion();
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

export { Forum };
