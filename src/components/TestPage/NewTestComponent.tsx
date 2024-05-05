import React, { useState, useEffect } from 'react';
import { IMark, IQuestion } from '../../models';
import QuestionService from '../../services/QuestionService';
import MarkService from '../../services/MarkService';
interface Question {
  id: number;
  name: string;
  annot: string;
}

interface Mark {
  id: number;
  name: string;
  value: number;
}

const questions: Question[] = [
  { id: 1, name: 'Question 1', annot: 'Annotation for Question 1' },
  { id: 2, name: 'Question 2', annot: 'Annotation for Question 2' },
];

const marks: Mark[] = [
  { id: 1, name: 'Mark A', value: 1 },
  { id: 2, name: 'Mark B', value: 2 },
];

export function NewTestComponent(){
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedMark, setSelectedMark] = useState<number | null>(null);
  const [selectedMarks, setSelectedMarks] = useState<number[]>([]);
    const[questions, setQuestions] = useState<IQuestion[]>([]);
    const[marks, setMarks] = useState<IMark[]>([]);
  
  const handleMarkSelection = (value: number) => {
    setSelectedMark(value);
  };

  const handleNextQuestion = () => {
    if (selectedMark !== null) {
      setSelectedMarks([...selectedMarks, selectedMark]);
      setSelectedMark(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Show test end message
      }
    }
  };

  const handleReturn = () => {
    // Redirect to "/"
  };


  useEffect(() => {
    QuestionService.getQuestions().then((response)=>{
        setQuestions(response.data)});
}, []);

useEffect(() => {
    if (questions.length > 0) {
        const questionId = questions[currentQuestionIndex].questionId; // Предположим, что у каждого вопроса есть уникальный идентификатор id
        QuestionService.getMarksByQuestionId(questionId).then((response) => {
            setMarks(response.data);
        });
    }
}, [currentQuestionIndex, questions]);   

  return (
    <div>
      {questions.map(question=>(
    <div key={question.questionId}>
      <div>
        <p>{question.questionName}</p>
        <p>{question.questionAnnot}</p>
      </div>
      <div>
        {marks.map((mark) => (
          <label key={mark.markId}>
            <input
              type="radio"
              name="mark"
              content={mark.markName}
              value={mark.markValue}
              checked={selectedMark === mark.markValue}
              onChange={() => handleMarkSelection(mark.markValue)}
            />
            {mark.markValue}
          </label>
        ))}
      </div>
      <button onClick={handleNextQuestion}>Submit</button>
      {currentQuestionIndex === questions.length && (
        <div>
          <p>Test ended</p>
          <p>Saved marks: {selectedMarks.join(', ')}</p>
          <button onClick={handleReturn}>Return</button>
        </div>
      )}
    </div>))}
    </div>
  );
};


