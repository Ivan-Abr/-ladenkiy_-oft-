import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import QuestionService from "../../services/QuestionService";
import {IQuestion} from "../../models";
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
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswer] = useState<string[]>([])
    const {orgId} = useParams<Params>();
    useEffect(() => {
        QuestionService.getQuestions().then((response)=>{
            setQuestions(response.data)});
    }, []);
    const marks:Mark[]=[
        {index: 1, data:"1.Bad"},
        {index: 2, data: "2.Good"},
        {index: 3, data: "3.Ugly"}]
    const handleAnswer = (selectedOptionIndex: number) => {
        setSelectedAnswer(selectedOptionIndex);};
    const handleConfirm = () => {
        if (selectedAnswer !== null) {
            const selectedMark = marks.find(mark => mark.index === selectedAnswer)
            if (selectedMark){
                setAnswer([...answers,selectedMark.data]);
            }}
        if (currentQuestionIndex === questions.length - 1) {
            return (
                <div>
                    <h3>Org ID: {orgId}</h3>
                    <p>Тест завершен. Ваши ответы:</p>
                    <ul>
                        {answers.map((answer, index) => (
                            <li key={index}>{answer}</li>
                        ))}
                    </ul>
                    <button onClick={() => window.location.href = "/"}>Перейти на главную страницу</button>
                </div>
            );
        }
        else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);}};
    return (
        <div>
            <h3>Org ID: {orgId}</h3>
            <p>{questions.length}</p>
            {questions.map(question =>(
                <div>
                    <p>{question.questionName}</p>
                    <p>{question.questionAnnot}</p>
                    {marks.map((mark) =>(
                        <div key={mark.index}>
                        <input
                            type="radio"
                            id={mark.index.toString()}
                            name="mark"
                            value={mark.data}
                            checked={selectedAnswer === mark.index}
                            onChange={()=>handleAnswer(mark.index)}/>
                            <label htmlFor={mark.index.toString()}>{mark.data}</label>
                        </div>))}
                    <button onClick={handleConfirm}>Confirm</button>
                </div>))}
        </div>);};


