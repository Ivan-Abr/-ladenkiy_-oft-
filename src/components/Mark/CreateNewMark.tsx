import React, {useState} from "react";
import {IMark} from "../../models";
import MarkService from "../../services/MarkService";
import {ErrorMessage} from "../ErrorMessage";

const markData: IMark = {
    markId: Math.random() + 11,
    markName: "",
    markValue:-1
}

interface createMarkProps{
    onCreate:(mark: IMark)=>void
}

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"


export function CreateNewMark({onCreate}: createMarkProps){
    const [numvalue, setNumValue] = useState(0)
    const [name, setName] = useState('')

    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault()
        setError('')

        if (numvalue == -1){
            setError('Please Enter valid value.')
            return
        }

        if (name.trim().length === 0){
            setError('Please Enter valid name.')
            return
        }

        markData.markValue = numvalue
        markData.markName = name
        const response = await MarkService.createMark(markData)
        onCreate(response.data)
    }
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
                id="annot"
                type="number"
                className={inputStyle}
                placeholder="Enter organization annotation"
                value={numvalue}
                onChange={event => setNumValue(event.target.valueAsNumber)}
            ></input>


            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>
    )


}