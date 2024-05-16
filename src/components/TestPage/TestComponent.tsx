// import React, {useEffect, useState} from 'react';
// import {useParams} from "react-router-dom";
// import QuestionService from "../../services/QuestionService";
// import {IMark, IQuestion} from "../../models";
// interface Question {
//     question: string;
//     options: string[];}
// interface Params{
//     [orgId:string]: string;}
// interface Mark{
//     index: number
//     data: string}
// export function TestComponent(){
//     const [questions, setQuestions] = useState<IQuestion[]>([])
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
//     const [answers, setAnswer] = useState<number[]>([])
//     const [marks, setMarks]  = useState<IMark[]>([])
//     const {orgId} = useParams<Params>();
//
//     useEffect(() => {
//         QuestionService.getQuestions().then((response)=>{
//             setQuestions(response.data)});
//     }, []);
//
//     useEffect(() => {
//         if (questions.length > 0) {
//             const questionId = questions[currentQuestionIndex].questionId; // Предположим, что у каждого вопроса есть уникальный идентификатор id
//             QuestionService.getMarksByQuestionId(questionId).then((response) => {
//                 setMarks(response.data);
//             });
//         }
//     }, [currentQuestionIndex, questions]);
//
//
//     const handleAnswer = (selectedOptionIndex: number) => {
//         setSelectedAnswer(selectedOptionIndex);};
//     const handleConfirm = () => {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//         setAnswer(prev=>[...prev,selectedAnswer])
//         setSelectedAnswer(0);
//     }
//     return (
//         <div>
//             <h3>Org ID: {orgId}</h3>
//             <p>{questions.length}</p>
//             {questions.map(question =>(
//                 <div key={question.questionId}>
//                     {question !== null?(<div>
//                         <p>{question.questionName}</p>
//                     <p>{question.questionAnnot}</p>
//                     {marks.map((mark) =>(
//                         <div key={mark.markId}>
//                         <input
//                             type="radio"
//                             id={mark.markId.toString()}
//                             name="mark"
//                             value={mark.markValue}
//                             checked={selectedAnswer === mark.markId}
//                             onChange={()=>handleAnswer(mark.markId)}/>
//                             <label htmlFor={mark.markId.toString()}>{mark.markName}</label>
//                         </div>))}
//                     <button onClick={handleConfirm}>Confirm</button>
//                         </div>
//                     ):(
//                         <div>
//                             <h3>Test Complete!</h3>
//                             <h2>{answers}</h2>
//                         </div>
//                     )}
//
//                 </div>))}
//         </div>
//         );};


import React, { useState } from 'react';

interface Question {
    question: string;
    options: string[];
}

export function TestComponent(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const questions: Question[] = [
        {
            question: 'С помощью каких инструментов осуществляется постановка задач сотрудникам в вашем подразделении?',
            options: ['0.Вербально, "на ходу"',
                '1.Задачи ставятся с помощью Email, мессенджеров, телефонных звонков',
                '2. Применяется набор средств автоматизации постановки задач, например, система электронного документооборота, Битрикс 24 и др.',
                '3.Комплексная интегрированная система с элементами искусственного интеллекта и цифровыми сервисами (BI-системы)'],
        },
        {
            question: 'Как исполнители участвуют в управлении задачами?',
            options: ['0. Исполнители не принимают участия в постановке задач',
                '1. Cкорее пассивно, чем активно (наблюдает)',
                '2. Cкорее активно, чем пассивно (делает)',
                '3.Полная инициативность при постановке задач поддерживается и существуют возможности ее проявления'],
        },
        {
            question: 'Как отслеживается качество работы сотрудников по реализации поставленных задач/выполненной работы?',
            options: ['0.Вербально, "на ходу"',
                '1.Задачи контролируются с помощью Email, мессенджеров, телефонных звонков',
                '2. Применяется набор средств автоматизации постановки задач, например, система электронного документооборота, Битрикс 24',
                '3.Комплексная интегрированная система с элементами искусственного интеллекта и цифровыми сервисами (BI-системы)'],
        },
        {
            question: 'Как в подразделении осуществляется развитие цифровых компетенций? ',
            options: ['0. Не осуществляется/ мне об этом не известно',
                '1. Спонтанно',
                '2. Целенаправленно посредством саморазвития и курсов повышения квалификации сотрудников с определенной дискретностью ',
                '3. Разрабатывается персональная траектория профессионального цифрового развития'],
        },
        // Add more questions here
    ];

    const handleAnswer = (selectedOptionIndex: number) => {
        setSelectedAnswer(selectedOptionIndex);
    };

    const handleConfirm = () => {
        if (selectedAnswer !== null) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    return (
        <div>
            {currentQuestionIndex < questions.length ? (
                <div>
                    <h3>{questions[currentQuestionIndex].question}</h3>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={option[index]}
                                name="answer"
                                value={index}
                                checked={selectedAnswer === index}
                                onChange={() => handleAnswer(index)}
                            />
                            <label htmlFor={option[index]}>{option}</label>
                        </div>
                    ))}
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            ) : (
                <div className="centered">
                    <h3>Тест пройден!</h3>
                    <p></p>
                    <form action="http://localhost:3011/#/">
                        <input type="submit" value="Вернуться на главый экран"/>
                    </form>
                </div>
            )}
        </div>
    );
};


