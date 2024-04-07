import axios from "axios";
import {IFactor, IFactorData} from "../models";

const FACTOR_API_URL = 'http://localhost:8080/dm/v1/factor';

const FactorService={

    getFactors:()=>{
        return axios.get(FACTOR_API_URL)
    },

    getFactorById:(factorId: number)=>{
        return axios.get(FACTOR_API_URL + "/"+factorId)
    },

    editFactor:(factorId:number, factor: IFactorData)=>{
        const data: IFactor = {
            factorId: factorId,
            factorName: factor.factorName,
            factorShortName:factor.factorShortName
        }
        return axios.put(FACTOR_API_URL+"/"+factorId, data)
    },

    deleteFactor:(factorId: number)=>{
        return axios.delete(FACTOR_API_URL+"/"+factorId)
    },

    createFactor:(factor: IFactorData)=>{
        return axios.post(FACTOR_API_URL, factor)
    },

    assignQuestionToFactor:(factorId: number, questionId: number)=>{
        return axios.put(FACTOR_API_URL+"/"+factorId+"/question/"+questionId)
    }
}

export  default FactorService