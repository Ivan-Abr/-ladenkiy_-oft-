import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import QuestionService from "../../services/QuestionService";
import {IMark, IQuestion} from "../../models";
interface Question {
    question: string;
    options: string[];}
interface Params{
    [orgId:string]: string;}
interface Mark{
    index: number
    data: string}
export function TestComponent(){
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
    const [answers, setAnswer] = useState<number[]>([])
    const [marks, setMarks]  = useState<IMark[]>([])
    const {orgId} = useParams<Params>();
    
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
    
    
    const handleAnswer = (selectedOptionIndex: number) => {
        setSelectedAnswer(selectedOptionIndex);};
    const handleConfirm = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer(prev=>[...prev,selectedAnswer])
        setSelectedAnswer(0);
    }
    return (
        <div>
            <h3>Org ID: {orgId}</h3>
            <p>{questions.length}</p>
            {questions.map(question =>(
                <div key={question.questionId}>
                    {question !== null?(<div>
                        <p>{question.questionName}</p>
                    <p>{question.questionAnnot}</p>
                    {marks.map((mark) =>(
                        <div key={mark.markId}>
                        <input
                            type="radio"
                            id={mark.markId.toString()}
                            name="mark"
                            value={mark.markValue}
                            checked={selectedAnswer === mark.markId}
                            onChange={()=>handleAnswer(mark.markId)}/>
                            <label htmlFor={mark.markId.toString()}>{mark.markName}</label>
                        </div>))}
                    <button onClick={handleConfirm}>Confirm</button>    
                        </div>
                    ):(
                        <div>
                            <h3>Test Complete!</h3>
                            <h2>{answers}</h2>
                        </div>
                    )}
                    
                </div>))}
        </div>
        );};


