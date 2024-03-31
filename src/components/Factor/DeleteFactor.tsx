import React, {useState} from "react";
import {IFactor} from "../../models";
import FactorService from "../../services/FactorService";


interface DeleteFactorProps{
    factorId:number;
    onDelete:(factor: IFactor)=>void;
}

export function DeleteFactor({factorId, onDelete}: DeleteFactorProps){
    const [error, setError] = useState('');
    const SubmitHandler = async(event: React.FormEvent)=>{
        event.preventDefault();
        setError('');
        const response = await FactorService.deleteFactor(factorId);
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
