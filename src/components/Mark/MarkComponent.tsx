import React, {useContext, useEffect, useState} from "react";
import {ILayer, IMark} from "../../models";
import useModal from "../../hooks/useModal";
import {ModalContext} from "../../context/ModalContext";
import MarkService from "../../services/MarkService";
import {EditLayer} from "../Layer/EditLayer";
import {CreateNewLayer} from "../Layer/CreateNewLayer";
import {DeleteLayer} from "../Layer/DeleteLayer";
import Modal from "../Modal";
import {CreateNewMark} from "./CreateNewMark";
import markService from "../../services/MarkService";
import {EditMark} from "./EditMark";
import {DeleteMark} from "./DeleteMark";




export function MarkComponent(){
    const [marks, setMark] = useState<IMark[]>([])
    const {isOpen, toggle} = useModal();
    const [details, setDetails] = useState(false);
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {modal, open, close} = useContext(ModalContext);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<"edit" | "create" | "delete">("edit")
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if (refresh){
            MarkService.getMarks().then((response)=>{
                setMark(response.data);
                setRefresh(false)
            })
        }
    }, [refresh]);

    function refreshPage(){
        setRefresh(true)
        toggle()
    }

    function addMark(mark: IMark){
        setMark(prev => [...prev, mark])
    }

    function editMark(mark : IMark){
        const index = marks.findIndex((m) => m.markId === mark.markId);
        if (index !== -1){
            const updateMarks = [...marks];
            updateMarks[index] = mark;
            setMark(updateMarks);
        }
    }

    function deleteMark(mark: IMark){
        const index = marks.findIndex((m) => m.markId === mark.markId);
        if (index !== -1){
            const updatedMarks = marks.filter((m) => m.markId !== mark.markId);
            setMark(updatedMarks)
        }
    }

    const createHandler = (mark: IMark)=>{
        close()
        addMark(mark)
        refreshPage()
    }

    const editHandler = (mark: IMark)=>{
        close();
        editMark(mark);
        refreshPage()
    }


    const deleteHandler = (mark: IMark)=>{
        close()
        deleteMark(mark);
        refreshPage();
    }

    function handleCreateClick(){
        setMode("create");
        toggle()
    }

    function handleEditClick(markId:number){
        setSelectedId(markId);
        setMode("edit");
        toggle();
    }

    function handleDeleteClick(markId: number){
        setSelectedId(markId)
        setMode("delete")
        toggle();
    }

    return(
        <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Mark Id</td>
                    <td>Mark Name</td>
                    <td>Mark Value</td>
                </tr>
                </thead>
                <tbody>
                {marks.map(mark => (
                    <tr key={mark.markId}>
                        <td>{mark.markId}</td>
                        <td>{mark.markName}</td>
                        <td>{mark.markValue}</td>
                        <td>
                            <button className={btnClasses.join(' ')}
                                             onClick={()=>handleEditClick(mark.markId)}>edit</button>
                            <button className={btnClasses.join(' ')}
                                    onClick={()=>handleDeleteClick(mark.markId)}
                            >delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={()=> handleCreateClick()}>Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ?(
                    <EditMark onEdit={editHandler} markId={selectedId}/>
                ):(
                    mode === "create" ?(<CreateNewMark onCreate={createHandler}/>):
                        (mode === "delete" ? (
                            <DeleteMark onDelete={deleteHandler} markId={selectedId}/>

                        ):(<p>Error</p>)))}
            </Modal>
        </div>
    )


}