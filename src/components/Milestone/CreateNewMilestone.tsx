import {ErrorMessage} from "../ErrorMessage";
import {IMilestone, IMilestoneData} from "../../models";
import React, {useState} from "react";
import MilestoneService from "../../services/MilestoneService";
import {randomInt} from "node:crypto";

const milesData: IMilestoneData= {
    dateTo:"",
    dateFrom:"",
    year:""
}


interface CreateMilesProps{
    onCreate:(miles: IMilestone)=> void
}

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

export function CreateNewMilestone({onCreate}: CreateMilesProps){
    const [value, setValue] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [year, setYear] = useState('')

    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (value.trim().length === 0){
            setError('Please enter valid date.')
            return
        }

        if (dateTo.trim().length === 0){
            setError('Please enter valid date.')
            return
        }

        if (year.trim().length === 0){
            setError('Please enter valid year.')
            return
        }

        milesData.dateFrom = value
        milesData.dateTo = dateTo
        milesData.year = year
        const response = await MilestoneService.createMiles(milesData)
        onCreate(response.data)
    }

    return(
        <form onSubmit={SubmitHandler} className="mb-3"
        >
            <input
                id = "dateFrom"
                type="text"
                className={inputStyle}
                placeholder="Enter organization value"
                value={value}
                onChange={event => setValue(event.target.value)}
            />

            <input
                id="dateTo"
                type="text"
                className={inputStyle}
                placeholder="Enter organization annotation"
                value={dateTo}
                onChange={event => setDateTo(event.target.value)}
            ></input>

            <input
                id = "year"
                type="text"
                className={inputStyle}
                placeholder="Enter organization contacts"
                value={year}
                onChange={event => setYear(event.target.value)}
            ></input>


            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>

    )
}