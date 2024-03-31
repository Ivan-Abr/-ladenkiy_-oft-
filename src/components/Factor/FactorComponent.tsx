import React, {useContext, useEffect, useState} from "react";
import {IFactor, ILayer} from "../../models";
import FactorService from "../../services/FactorService";
import Modal from "../Modal";
import {EditFactor} from "./EditFactor";
import {CreateNewFactor} from "./CreateNewFactor";
import {DeleteFactor} from "./DeleteFactor";
import useModal from "../../hooks/useModal";
import {ModalContext} from "../../context/ModalContext";

export function FactorComponent(){
    const [factors, setFactors ] = useState<IFactor[]>([])
    const {isOpen, toggle} = useModal();
    const [details, setDetails] = useState(false);
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {modal, open, close} = useContext(ModalContext);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<"edit" | "create" | "delete">("edit")



    useEffect(() => {
        FactorService.getFactors().then((response)=>{
            setFactors(response.data)
        });
    }, []);


    function refreshPage(){
        window.location.reload();
    }


    function addFactor(factor: IFactor){
        setFactors(prev=>[...prev, factor])
    }


    function editFactor(factor: IFactor){
        const index = factors.findIndex((l) => l.factorId === factor.factorId);
        if (index!== -1){
            const updateFactors = [...factors];
            updateFactors[index] = factor;
            setFactors(updateFactors);
        }
    }


    function deleteFactor(factor:IFactor){
        const index = factors.findIndex((l) => l.factorId === factor.factorId);
        if (index !== -1){
            const updatedFactors = factors.filter((l) => l.factorId !== factor.factorId);
            setFactors(updatedFactors )
        }
    }
    


    const createHandler = (factor:IFactor)=>{
        close()
        addFactor(factor);
        refreshPage();
    }

    const editHandler = (factor: IFactor)=>{
        close();
        editFactor(factor);
        refreshPage();
    }

    const deleteHandler = (factor: IFactor)=>{
        close()
        deleteFactor(factor);
        refreshPage();
    }


    function handleCreateClick(){
        setMode("create");
        toggle();
    }

    function handleEditClick(factorId:number){
        setSelectedId(factorId);
        setMode("edit");
        toggle();
    }

    function handleDeleteClick(factorId: number){
        setSelectedId(factorId);
        setMode("delete");
        toggle();
    }


    return(
        <div>
            {/*<h3 className="text-lg-start">Factors</h3>*/}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Factor Id</td>
                    <td>Factor Name</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {factors.map(factor => (
                    <tr key={factor.factorId}>
                        <td>{factor.factorId}</td>
                        <td>{factor.factorName}</td>
                        <td>{factor.factorShortName}</td>
                        <td>
                            <button className={btnClasses.join(' ')}
                                    onClick={() => handleEditClick(factor.factorId)}
                            >edit
                            </button>
                            <button className={btnClasses.join(' ')}
                                    onClick={() => handleDeleteClick(factor.factorId)}
                            >delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => handleCreateClick()}> Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ? (<EditFactor onEdit={editHandler} factorId={selectedId}/>) : (
                    mode === "create" ? (<CreateNewFactor onCreate={createHandler}/>) :
                        (mode === "delete" ? (<DeleteFactor onDelete={deleteHandler} factorId={selectedId}/>) : (
                            <p>Error</p>)))}
            </Modal>
        </div>
    )


}
