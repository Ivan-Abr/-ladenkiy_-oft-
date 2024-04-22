import React, {useEffect, useState} from "react";
import OrgService from "../../services/OrgService";
import {IOrg} from "../../models";
import {useNavigate} from "react-router-dom";
export function TestGreeting(){
    const [orgs, setOrgs] = useState<IOrg[]>([])
    const navigate  = useNavigate();

    const SubmitHandler = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const selectedOrgId = event.currentTarget["org[]"].value;
        navigate(`/testing/${selectedOrgId}`);
    };

    useEffect(() => {
            OrgService.getOrgs().then((response)=>{
                setOrgs(response.data)});}, []);

    return(
        <div>
            <form onSubmit={SubmitHandler}>
                <h4>Please, choose your organization</h4>
                <p><select multiple name="org[]">
                    {orgs.map(org =>(
                        <option key={org.orgId} value={org.orgId}>{org.orgName}</option>))}
                </select></p>
                <p><input type="submit" value="Submit"/></p>
            </form>
        </div>)
}