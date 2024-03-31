
import React, {useContext, useEffect, useState} from "react";
import OrgService from "../../services/OrgService";
import {IOrg} from "../../models";
import {ModalContext} from "../../context/ModalContext";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";

import {CreateNewOrg} from "./CreateNewOrg";
import {EditOrg} from "./EditOrg";
import {DeleteOrg} from "./DeleteOrg";







export function OrgComponent(){
    const [orgs, setOrgs] = useState<IOrg[]>([]);
    const [details, setDetails] = useState(false);
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {modal, open, close} = useContext(ModalContext);
    const {isOpen, toggle} = useModal();
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<"edit" | "create" | "delete">("edit")
    const [refresh, setRefresh] = useState(true);


    useEffect(()=>{
        if (refresh) {
            OrgService.getOrgs().then((response)=>{
               setOrgs(response.data);
               setRefresh(false)
            });
        }
    }, [refresh]);


    function refreshPage(){
        setRefresh(true)
    }


    function addOrg(org:IOrg){
        setOrgs(prev =>[...prev, org]);
    }


    function editOrg(org:IOrg){
        const index = orgs.findIndex((o) => o.orgId === org.orgId);
        if (index !== -1){
            const updateOrgs = [...orgs];
            updateOrgs[index] = org;
            setOrgs(updateOrgs);
        }

    }

    function deleteOrg(org:IOrg){
        const index = orgs.findIndex((o) => o.orgId === org.orgId);
        if (index !== -1){
            const updatedOrgs = orgs.filter((o) => o.orgId !== org.orgId);
            setOrgs(updatedOrgs)
        }
    }


    const createHandler = (org: IOrg)=>{
        close();
        addOrg(org);
        refreshPage();
    }


    const editHandler = (org: IOrg) =>{
        close();
        editOrg(org);
        refreshPage();

    }

    const deleteHandler = (org: IOrg) =>{
        close();
        deleteOrg(org);
        refreshPage();
    }




    function handleEditClick(orgId:number){
        setSelectedId(orgId);
        setMode("edit");
        toggle();
    }


    function handleCreateClick(){
        setMode("create");
        toggle();
    }

    function handleDeleteClick(orgId: number){
        setSelectedId(orgId);
        setMode("delete");
        toggle();
    }



    return(
        <div>
            {/*<h3 className="text-lg-start">Organizations</h3>*/}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Org Id</td>
                    <td>Org Name</td>
                    <td>Org Annotation</td>
                    <td>Org Contacts</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {orgs.map(org => (
                    <tr key={org.orgId}>
                        <td>{org.orgId}</td>
                        <td>{org.orgName}</td>
                        <td>{org.orgAnnot}</td>
                        <td>{org.orgContacts}</td>
                        <td>
                            <button className={btnClasses.join(' ')}
                                onClick={()=>handleEditClick(org.orgId)}>edit
                            </button>
                            <button className={btnClasses.join(' ')} 
                                    onClick={()=>handleDeleteClick(org.orgId)}
                            >delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
           <button onClick={()=>handleCreateClick()}> Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ?(<EditOrg orgId={selectedId} onEdit={editHandler}/>):
                    mode === "create" ?(<CreateNewOrg onCreate={createHandler}/>):
                mode === "delete" ? (<DeleteOrg orgId={selectedId} onDelete={deleteHandler}/>):(<p>Error</p>)}
            </Modal>
        </div>
    )
}