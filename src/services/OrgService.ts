import axios from "axios";
import {IOrg, IOrgData} from "../models";

const ORG_API_URL = 'http://localhost:8080/dm/v1/org';




const OrgService = {
    getOrgs: ()=>{
        return axios.get(ORG_API_URL);
    },

    editOrg:(orgId: number, org: IOrgData)=>{

        return axios.put(ORG_API_URL+"/"+orgId, org);
    },

    deleteOrg:(orgId:number)=>{
    return axios.delete(ORG_API_URL+"/"+orgId);
    },

    createOrg:(org: IOrgData)=>{

         return axios.post(ORG_API_URL, org)
    }

};

export default OrgService;