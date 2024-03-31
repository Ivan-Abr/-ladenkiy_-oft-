import React, { useState } from "react";
import { ILayer } from "../../models";
import LayerService from "../../services/LayerService";
import { ErrorMessage } from "../ErrorMessage";

const layerData: ILayer = {
    layerId: Math.random()*10 + 10,
    layerName:""
}


interface createLayerProps{
    onCreate:(layer:ILayer)=>void
}

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"


export function CreateNewLayer({onCreate}: createLayerProps){
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const SubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault()
        setError('')
        
        if (value.trim().length === 0){
            setError('Please Enter valid value.')
            return
        }
        
        layerData.layerName = value
        const response = await LayerService.createNewLayer(layerData)
        onCreate(response.data)
    }

    return(
        <form onSubmit={SubmitHandler} className="mb-3">
            <input
                id = "name"
                type="text"
                className={inputStyle}
                placeholder="Enter layer name"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>

        </form>
    )

}
