import axios from "axios";
import {IMark} from "../models";

const MARK_API_URL = 'http://localhost:8080/dm/v1/mark'

const MarkService = {
    getMarks:()=>{
        return axios.get(MARK_API_URL);
    },

    editMark:(markId: number, mark:IMark)=>{
        return axios.put(MARK_API_URL+"/"+markId, mark);
    },

    deleteMark:(markId:number)=>{
        return axios.delete(MARK_API_URL+"/"+markId)
    },

    createMark:(mark:IMark)=>{
        return axios.post(MARK_API_URL, mark)
    }
}

export default MarkService