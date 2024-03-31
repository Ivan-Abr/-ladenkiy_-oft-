import React, {useContext, useEffect, useState} from "react";
import {ILayer} from "../../models";
import useModal from "../../hooks/useModal";
import Modal from "../Modal";

import LayerService from "../../services/LayerService";
import { CreateNewLayer } from "./CreateNewLayer";
import { EditLayer } from "./EditLayer";
import { DeleteLayer } from "./DeleteLayer";
import {ModalContext} from "../../context/ModalContext";

export function LayerComponent(){
    const [layers, setLayers] = useState<ILayer[]>([])
    const {isOpen, toggle} = useModal();
    const [details, setDetails] = useState(false);
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {modal, open, close} = useContext(ModalContext);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<"edit" | "create" | "delete">("edit")



    useEffect(()=>{
        LayerService.getLayers().then((response)=>{
            setLayers(response.data);
        });
    },[]);


    function refreshPage(){
        window.location.reload();
    }


    function addLayer(layer: ILayer){
        setLayers(prev=>[...prev, layer])
    }


    function editLayer(layer: ILayer){
        const index = layers.findIndex((l) => l.layerId === layer.layerId);
        if (index!== -1){
            const updateLayers = [...layers];
            updateLayers[index] = layer;
            setLayers(updateLayers);
        }
    }


    function deleteLayer(layer:ILayer){
        const index = layers.findIndex((l) => l.layerId === layer.layerId);
        if (index !== -1){
            const updatedLayers = layers.filter((l) => l.layerId !== layer.layerId);
            setLayers(updatedLayers )
        }
    }


    const createHandler = (layer:ILayer)=>{
        close()
        addLayer(layer);
        refreshPage();
    }

    const editHandler = (layer: ILayer)=>{
        close();
        editLayer(layer);
        refreshPage();
    }

    const deleteHandler = (layer: ILayer)=>{
        close()
        deleteLayer(layer);
        refreshPage();
    }


    function handleCreateClick(){
        setMode("create");
        toggle();
    }

    function handleEditClick(layerId:number){
        setSelectedId(layerId);
        setMode("edit");
        toggle();
    }

    function handleDeleteClick(layerId: number){
        setSelectedId(layerId);
        setMode("delete");
        toggle();
    }
    

    return(
        <div>
            {/*<h3 className="text-lg-start">Layers</h3>*/}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Layer Id</td>
                    <td>Layer Name</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {layers.map(layer => (
                    <tr key={layer.layerId}>
                        <td>{layer.layerId}</td>
                        <td>{layer.layerName}</td>
                        <td>
                            <button className={btnClasses.join(' ')}
                                    onClick={()=>handleEditClick(layer.layerId)}
                            >edit</button>
                            <button className={btnClasses.join(' ')}
                                             onClick={()=>handleDeleteClick(layer.layerId)}
                            >delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => handleCreateClick()  }> Create new</button>
            <Modal isOpen={isOpen} toggle={toggle} mode={mode}>
                {mode === "edit" ?(<EditLayer onEdit={editHandler} layerId={selectedId}/>):(
                    mode === "create" ?(<CreateNewLayer onCreate={createHandler}/>):
                        (mode === "delete" ? (<DeleteLayer onDelete={deleteHandler} layerId={selectedId}/>):(<p>Error</p>)))}
            </Modal>
        </div>
    )
}