import React, {useState} from "react";
import {IMark} from "../../models";
import MarkService from "../../services/MarkService";

interface DeleteMarkProps{
    markId: number
    onDelete:(mark: IMark) => void;
}

export function DeleteMark({markId, onDelete}: DeleteMarkProps){
    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        const response   = await MarkService.deleteMark(markId)
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