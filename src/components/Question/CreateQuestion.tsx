import React, {useState} from "react";
import {IQuestion} from "../../models";
import exp from "node:constants";
import QuestionService from "../../services/QuestionService";
import {ErrorMessage} from "../ErrorMessage";


const questData: IQuestion = {
    questionId: Math.random()+100,
    questionName:"",
    questionAnnot:""
}


interface CreateQuestionProps{
    onCreate:(question: IQuestion)=>void
}

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

export function CreateNewQuestion({onCreate}: CreateQuestionProps){
    const [name, setName] = useState('')
    const [annot, setAnnot] = useState('')
    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent) =>{
        event.preventDefault()
        setError('')

        if (name.trim().length === 0){
            setError('Please Enter valid name.')
            return
        }

        if (annot.trim().length === 0){
            setError('Please Enter valid annotation.')
            return
        }

        questData.questionName = name
        questData.questionAnnot = annot
        const response = await QuestionService.createQuestion(questData)
        onCreate(response.data)
    }

    return (
        <form onSubmit={SubmitHandler} className="mb-3"
        >
            <input
                id="name"
                type="text"
                className={inputStyle}
                placeholder="Enter organization name"
                value={name}
                onChange={event => setName(event.target.value)}
            />

            <input
                id="annot"
                type="text"
                className={inputStyle}
                placeholder="Enter organization annotation"
                value={annot}
                onChange={event => setAnnot(event.target.value)}
            ></input>




            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>
    )

}