import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import QuestionService from "../../services/QuestionService";
import {IQuestion} from "../../models";
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

interface Mark{
    index: number
    data: string
}

export function TestComponent(){
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const {orgId} = useParams<Params>();

    useEffect(() => {
        QuestionService.getQuestions().then((response)=>{
            setQuestions(response.data)});
    }, []);


    const marks:Mark[]=[
        {index: 1, data:"1.Bad"},
        {index: 2, data: "2.Good"},
        {index: 3, data: "3.Ugly"}
    ]

    // const questions: Question[] = [
    //     {
    //         question: 'С помощью каких инструментов осуществляется постановка задач сотрудникам в вашем подразделении (оценка степени проникновенния цифровых инструментов)?',
    //         options: ['0. Вербально, "на ходу"',
    //             '1. Задачи ставятся с помощью Email, мессенджеров, телефонных звонков',
    //             '2. Применяется набор средств автоматизации постановки задач, например, система электронного документооборота, Битрикс 24 и др.',
    //             '3. Комплексная интегрированная система с элементами искусственного интеллекта и цифровыми сервисами (BI-системы)'],
    //     },
    //     {
    //         question: 'Как исполнители участвуют в управлении задачами? (оценка зрелости организационной культуры при поставновке задач)',
    //         options: ['0. Исполнители не принимают участия в постановке задач',
    //             '1. скорее пассивно, чем активно (наблюдает)',
    //             '2. скорее активно, чем пассивно (делает)',
    //             '3. Полная инициативность при постановке задач поддерживается и существуют возможности ее проявления'],
    //     },
    //
    // ];

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
                            onChange={()=>handleAnswer(mark.index)}
                        />
                            <label htmlFor={mark.index.toString()}>{mark.data}</label>
                        </div>
                    ))}
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            ))}
        </div>
    );
};


