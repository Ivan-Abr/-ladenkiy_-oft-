
import React, {useContext, useEffect, useState} from "react";

import {IMilestone} from "../../models";
import {ModalContext} from "../../context/ModalContext";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";
import {EditMilestone} from "./EditMilestone";

import MilestoneService from "../../services/MilestoneService";
import {CreateNewMilestone} from "./CreateNewMilestone";
import {DeleteMilestone} from "./DeleteMilestone";







export function MilesComponent(){
    const [milestones, setMiles] = useState<IMilestone[]>([]);
    const [details, setDetails] = useState(false);
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {modal, open, close} = useContext(ModalContext);
    const {isOpen, toggle} = useModal();
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<"edit" | "create" | "delete">("edit")
    const [refresh, setRefresh] = useState(true);

    useEffect(()=>{
        if (refresh){
       MilestoneService.getMiles().then((response) =>{
            setMiles(response.data);
            setRefresh(false)
        });
        }

    },[refresh]);


    function refreshPage(){
       setRefresh(true);
       toggle()
    }


    function addMiles(milestone:IMilestone){
        setMiles(prev =>[...prev, milestone]);
    }


    function editMiles(milestone:IMilestone){
        const index = milestones.findIndex((o) => o.milestoneId === milestone.milestoneId);
        if (index !== -1){
            const updateMiless = [...milestones];
            updateMiless[index] = milestone;
            setMiles(updateMiless);
        }

    }

    function deleteMiles(milestone:IMilestone){
        const index = milestones.findIndex((o) => o.milestoneId === milestone.milestoneId);
        if (index !== -1){
            const updatedMiless = milestones.filter((o) => o.milestoneId !== milestone.milestoneId);
            setMiles(updatedMiless)
        }
    }


    const createHandler = (milestone: IMilestone)=>{
        close();
        addMiles(milestone);
        refreshPage();
    }


    const editHandler = (milestone: IMilestone) =>{
        close();
        editMiles(milestone);
        refreshPage();

    }

    const deleteHandler = (milestone: IMilestone) =>{
        close();
        deleteMiles(milestone);
        refreshPage();
    }




    function handleEditClick(milestoneId:number){
        setSelectedId(milestoneId);
        setMode("edit");
        toggle();
    }


    function handleCreateClick(){
        setMode("create");
        toggle();
    }

    function handleDeleteClick(milestoneId: number){
        setSelectedId(milestoneId);
        setMode("delete");
        toggle();
    }



    return(
        <div>
            {/*<h3 className="text-lg-start">Milesanizations</h3>*/}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Miles Id</td>
                    <td>Miles Date From</td>
                    <td>Miles DateTo</td>
                    <td>Miles Year</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {milestones.map(milestone => (
                    <tr key={milestone.milestoneId}>
                        <td>{milestone.milestoneId}</td>
                        <td>{milestone.dateFrom}</td>
                        <td>{milestone.dateTo}</td>
                        <td>{milestone.year}</td>
                        <td>
                            <button className={btnClasses.join(' ')}
                                    onClick={()=>handleEditClick(milestone.milestoneId)}>edit
                            </button>
                            <button className={btnClasses.join(' ')}
                                    onClick={()=>handleDeleteClick(milestone.milestoneId)}
                            >delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={()=>handleCreateClick()}> Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ?(<EditMilestone onEdit={editHandler} milestoneId={selectedId}/>):
                    mode === "create" ?(<CreateNewMilestone onCreate={createHandler}/>):
                        mode === "delete" ? (<DeleteMilestone milesId={selectedId} onDelete={deleteHandler}/>):(<p>Error</p>)}
            </Modal>
        </div>
    )
}