import React, {useState} from "react";
import OrgService from "../../services/OrgService";
import {IOrg} from "../../models";

interface DeleteOrgProps{
    orgId: number;
    onDelete:(org:IOrg) => void;
}

export function DeleteOrg({orgId, onDelete}: DeleteOrgProps){
    const [error, setError] = useState('')
    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault();
        setError('');
        const response = await OrgService.deleteOrg(orgId)
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