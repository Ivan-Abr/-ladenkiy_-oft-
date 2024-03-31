import React, {useState} from "react";
import {IOrg, IOrgData} from "../../models";
import OrgService from "../../services/OrgService";
import {ErrorMessage} from "../ErrorMessage";





const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

interface EditOrgProps{
    orgId: number;
    onEdit:(org:IOrg)=>void;
}


export function EditOrg({orgId, onEdit}: EditOrgProps){
    const [value, setValue] = useState('')
    const [annot, setAnnot] = useState('')
    const [contacts, setContacts] = useState('')
    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent) =>{
        event.preventDefault()
        setError('')


        if (value.trim().length === 0){
            setError('Please Enter valid value.')
            return
        }

        if (annot.trim().length === 0){
            setError('Please Enter valid annotation.')
            return
        }

        if (contacts.trim().length === 0){
            setError('Please Enter valid contacts.')
            return
        }


        const orgData:IOrg = {
            orgId:orgId,
            orgName:value,
            orgAnnot:annot,
            orgContacts:contacts
        };

        orgData.orgName = value
        orgData.orgAnnot = annot
        orgData.orgContacts = contacts
        const response = await OrgService.editOrg(orgId, orgData)
        onEdit(response.data)};

    return( <form onSubmit={SubmitHandler}>
        <input
            id="name"
            type="text"
            className={inputStyle}
            placeholder="Enter organization value"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
        <input
            id="annot"
            type="text"
            className={inputStyle}
            placeholder="Enter organization annotation"
            value={annot}
            onChange={event => setAnnot(event.target.value)}
        />
        <input
            id="contacts"
            type="text"
            className={inputStyle}
            placeholder="Enter organization contacts"
            value={contacts}
            onChange={event => setContacts(event.target.value)}
        ></input>
        {error && <ErrorMessage error={error}/>}
        <button type="submit">Save</button>
    </form>
    );


}