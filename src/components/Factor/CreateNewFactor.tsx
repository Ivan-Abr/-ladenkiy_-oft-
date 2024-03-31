import React, {useState} from "react";
import {IFactor, IFactorData} from "../../models";
import axios from "axios";
import FactorService from "../../services/FactorService";
import {ErrorMessage} from "../ErrorMessage";

const factorData: IFactorData ={
    factorName:"",
    factorShortName:""
}


interface CreateFactorProps{
    onCreate:(factor:IFactor)=> void
}

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"


export function CreateNewFactor({onCreate}: CreateFactorProps){
    const [value, setValue] = useState('')
    const [short, setShort] = useState('')



    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault()
        setError('')

        if (value.trim().length === 0){
            setError('Please Enter valid value.')
            return
        }

        if (short.trim().length === 0){
            setError('Please Enter valid annotation.')
            return
        }



        factorData.factorName = value
        factorData.factorShortName = short
        const response = await FactorService.createFactor(factorData)
        onCreate(response.data)

    }

    return(
        <form onSubmit={SubmitHandler} className="mb-3"
        >
            <input
                id = "name"
                type="text"
                className={inputStyle}
                placeholder="Enter factoranization value"
                value={value}
                onChange={event => setValue(event.target.value)}
            />

            <input
                id="annot"
                type="text"
                className={inputStyle}
                placeholder="Enter factoranization annotation"
                value={short}
                onChange={event => setShort(event.target.value)}
            ></input>
            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>

    )
}