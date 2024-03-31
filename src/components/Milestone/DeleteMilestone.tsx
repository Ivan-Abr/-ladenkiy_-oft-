import React, {useState} from "react";
import MilestoneService from "../../services/MilestoneService";
import {IMilestone} from "../../models";
import OrgService from "../../services/OrgService";

interface DeleteMilesProps{
    milesId: number;
    onDelete:(miles: IMilestone) => void;
}

export function DeleteMilestone({milesId, onDelete}: DeleteMilesProps){
    const [error, setError] = useState('')
    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault();
        setError('');
        const response = await MilestoneService.deleteMiles(milesId)
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