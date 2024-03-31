import React, {useState} from "react";
import {IFactor} from "../../models";
import FactorService from "../../services/FactorService";
import {ErrorMessage} from "../ErrorMessage";

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

interface EditFactorProps{
    factorId: number,
    onEdit:(factor: IFactor)=>void,
}

export function EditFactor({factorId, onEdit}: EditFactorProps){
    const [value, setValue] = useState('')
    const [sname, setSname] = useState('')
    const[error, setError]=useState('')

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault()
        setError('')

        if (value.trim().length ===0){
            setError('Please, enter valid value')
            return
        }

        if (sname.trim().length ===0){
            setError('Please, enter valid sname')
            return
        }


        const factorData: IFactor = {
            factorId:factorId,
            factorName: value,
            factorShortName: sname
        }
        const response = await FactorService.editFactor(factorId,factorData)
        onEdit(response.data)
    }

    return(
        <form onSubmit={SubmitHandler} className="mb-3">
            <input
                id="name"
                type="text"
                className={inputStyle}
                placeholder="Enter factor name"
                value={value}
                onChange={event => setValue(event.target.value)}
            ></input>
            <input
                id="sname"
                type="text"
                className={inputStyle}
                placeholder="Enter factor shortname"
                value={sname}
                onChange={event => setSname(event.target.value)}
            ></input>
            {error &&<ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>
    )
}