import React, { useState } from "react";
import { ILayer } from "../../models";
import LayerService from "../../services/LayerService";
import { ErrorMessage } from "../ErrorMessage";

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"


interface EditLayerProps{
    layerId: number;
    onEdit:(layer:ILayer)=>void;
}


export function EditLayer({layerId, onEdit}: EditLayerProps){
    const[value, setValue] = useState('');
    const [error, setError] = useState('');
    

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault();
        setError('')

        if (value.trim().length === 0){
            setError('Please Enter valid value.')
            return
        }

        const layerData: ILayer = {
            layerId:layerId,
            layerName:value
        }

        const response = await LayerService.editLayer(layerId,layerData);
        onEdit(response.data)
    };
    return(
        <form onSubmit={SubmitHandler}>
            <input
            id="name"
            type="text"
            className={inputStyle}
            placeholder="Enter organization value"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
        {error && <ErrorMessage error={error}/>}
        <button type="submit">Save</button>
        </form>
        
    )



}

