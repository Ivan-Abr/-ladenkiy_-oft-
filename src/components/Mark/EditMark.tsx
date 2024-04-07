import React, {useState} from "react";
import {IMark} from "../../models";
import MarkService from "../../services/MarkService";
import {ErrorMessage} from "../ErrorMessage";

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

interface EditMarkProps{
    markId: number,
    onEdit:(mark: IMark)=>void;
}
export function EditMark({markId, onEdit}: EditMarkProps){
    const [name, setName] = useState('');
    const [numValue, setNumValue] = useState(-1);
    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault();
        setError('')

        if (name.trim().length === 0){
            setError('Please enter valid name.')
            return
        }

        if (numValue < 0){
            setError('Please enter valid value')
            return
        }

        const markData: IMark = {
            markId:markId,
            markName: name,
            markValue: numValue
        }

        const response = await MarkService.editMark(markId, markData);
        onEdit(response.data)
    };

    return(
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
                id="value"
                type="number"
                className={inputStyle}
                placeholder="Enter organization annotation"
                value={numValue}
                onChange={event => setNumValue(event.target.valueAsNumber)}
            ></input>


            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>
    )
}