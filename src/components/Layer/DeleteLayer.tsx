import React, { useState } from "react";
import { ILayer } from "../../models";
import LayerService from "../../services/LayerService";

interface DeleteLayerProps{
    layerId:number;
    onDelete:(layer: ILayer)=>void;
}

export function DeleteLayer({layerId, onDelete}: DeleteLayerProps){
    const [error, setError] = useState('');
    const SubmitHandler = async(event: React.FormEvent)=>{
        event.preventDefault();
        setError('');
        const response = await LayerService.deleteLayer(layerId);
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