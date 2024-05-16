import exp from "node:constants";
import {finished} from "node:stream";



export interface IOrg{
    orgId: number;
    orgName: string;
    orgAnnot: string;
    orgContacts: string;
}
export interface IOrgData{
    orgName: string;
    orgAnnot: string;
    orgContacts: string;
}







export interface ILayer{
    layerId: number;
    layerName: string;
}

export interface ILayerCut{
    layerName:String
}





export interface IFactor{
    factorId: number;
    factorName: string;
    factorShortName: string;

}




export interface IFactorData{
    factorName:string
    factorShortName: string
}




export interface IMilestone{
    milestoneId: number;
    dateFrom: string;
    dateTo: string;
    year: string;}

export interface IMilestoneData{
    dateFrom: string;
    dateTo: string;
    year: string;
}

export interface IMark{
    markId: number,
    markName: string,
    markValue: number
}

export interface IQuestion{
    questionId: number,
    questionName: string,
    questionAnnot: string
    marks?: IMark[]
}

export interface IAnswer{
    avg: number,
    layer: string,
    factor: string,
    year: string
}