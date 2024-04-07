import React, {useContext, useEffect, useState} from "react";
import {IMark} from "../../models";
import useModal from "../../hooks/useModal";
import {ModalContext} from "../../context/ModalContext";
import MarkService from "../../services/MarkService";
import {EditLayer} from "../Layer/EditLayer";
import {CreateNewLayer} from "../Layer/CreateNewLayer";
import {DeleteLayer} from "../Layer/DeleteLayer";
import Modal from "../Modal";
import {CreateNewMark} from "./CreateNewMark";




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

    const createHandler = (mark: IMark)=>{
        close()
        addMark(mark)
        refreshPage()
    }

    function handleCreateClick(){
        setMode("create");
        toggle()
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
                            <button>edit</button>
                            <button>delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={()=> handleCreateClick()}>Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ?(<p>Daun</p>
                    // <EditLayer onEdit={editHandler} layerId={selectedId}/>
                ):(
                    mode === "create" ?(<CreateNewMark onCreate={createHandler}/>):
                        (mode === "delete" ? (<p>Daun</p>
                            // <DeleteLayer onDelete={deleteHandler} layerId={selectedId}/>

                        ):(<p>Error</p>)))}
            </Modal>
        </div>
    )


}