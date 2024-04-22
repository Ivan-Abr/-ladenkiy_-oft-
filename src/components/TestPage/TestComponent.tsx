import React, { useState } from 'react';
import {useParams} from "react-router-dom";
interface Question {
    question: string;
    options: string[];
}
// interface TestComponentProps{
//     orgId:number
// }

interface Params{
    [orgId:string]: string;
}

export function TestComponent(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const {orgId} = useParams<Params>();
    const questions: Question[] = [
        {
            question: 'С помощью каких инструментов осуществляется постановка задач сотрудникам в вашем подразделении (оценка степени проникновенния цифровых инструментов)?',
            options: ['0. Вербально, "на ходу"',
                '1. Задачи ставятся с помощью Email, мессенджеров, телефонных звонков',
                '2. Применяется набор средств автоматизации постановки задач, например, система электронного документооборота, Битрикс 24 и др.',
                '3. Комплексная интегрированная система с элементами искусственного интеллекта и цифровыми сервисами (BI-системы)'],
        },
        {
            question: 'Как исполнители участвуют в управлении задачами? (оценка зрелости организационной культуры при поставновке задач)',
            options: ['0. Исполнители не принимают участия в постановке задач',
                '1. скорее пассивно, чем активно (наблюдает)',
                '2. скорее активно, чем пассивно (делает)',
                '3. Полная инициативность при постановке задач поддерживается и существуют возможности ее проявления'],
        },

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
            <h3>Org ID: {orgId}</h3>
            {currentQuestionIndex < questions.length ? (
                <div className="quest-test">
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
                <div>
                    <h3>Тест пройден</h3>
                    <p>{selectedAnswer}</p>
                </div>
            )}
        </div>
    );
};


