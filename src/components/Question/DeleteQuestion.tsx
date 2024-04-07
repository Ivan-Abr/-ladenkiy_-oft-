import React, {useState} from "react";
import {IQuestion} from "../../models";
import OrgService from "../../services/OrgService";
import QuestionService from "../../services/QuestionService";

interface DeleteQuestionProps{
    questionId: number,
    onDelete:(question: IQuestion)=> void;
}

export function DeleteQuestion({questionId, onDelete}: DeleteQuestionProps){
    const [error, setError] = useState('')
    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault();
        const response = await QuestionService.deleteQuestion(questionId)
        onDelete(response.data)
    }
    return(
        <form onSubmit={SubmitHandler}>
            <h4>Are you sure?</h4>
            <p>Data will not be restored</p>
            <button type={"submit"}>Delete</button>
        </form>
)
}