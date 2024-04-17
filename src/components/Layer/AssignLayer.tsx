import React, {useState} from "react";
import {IFactor} from "../../models";
import FactorService from "../../services/FactorService";

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

interface AssignFactorProps{
    onAssign:(factor: IFactor)=>void
}

export function AssignFactor({onAssign}: AssignFactorProps){
    const [factorId, setFactorId] = useState(-1)
    const [questionId, setQuestionId] = useState(-1)
    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault()
        setError('')

        // const responseFactor = await FactorService.getFactorById(factorId)
        // const responseQuest = await

        const response = await FactorService.assignQuestionToFactor(factorId,questionId)
        onAssign(response.data)
    }

    return(
        <form onSubmit={SubmitHandler} className="mb-3">
            <input
                id="factorId"
                type="number"
                className={inputStyle}
                placeholder="enter factor id"
                value={factorId}
                onChange={event => setFactorId(event.target.valueAsNumber)}
            ></input>
            <input
                id="questionId"
                type="number"
                className={inputStyle}
                placeholder="enter question id"
                value={questionId}
                onChange={event => setQuestionId(event.target.valueAsNumber)}
            ></input>
        </form>
    )

}