import axios from "axios";
import {IMilestone, IMilestoneData} from "../models";

const MILE_API_URL = 'http://localhost:8080/dm/v1/milestone';


const MilestoneService = {
    getMiles:()=>{
        return axios.get(MILE_API_URL);
    },

    editMiles:(milesId: number, miles: IMilestone)=>{
        return axios.put(MILE_API_URL + "/" + milesId, miles)
    },

    deleteMiles:(milesId: number)=>{
        return axios.delete(MILE_API_URL+"/"+milesId);
    },

    createMiles:(miles : IMilestoneData)=>{
        console.log(miles)
        return axios.post(MILE_API_URL, miles)
    }
}

export default MilestoneService