import exp from "node:constants";



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
    questionIds:number[];

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
}