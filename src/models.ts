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