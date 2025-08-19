import axios from "axios";
import type { TranscriptLine } from "../types/Transcript";
import type { SpeakerEnum } from "../types/SpeakerEnum";
import type { Keywords } from "../types/Keywords";
import type { SummaryLine, SummarySegments } from "../types/Summary";
import { useAppStore } from "../context/AppStore";




export const getTranscript:(interview_number:number)=>Promise<TranscriptLine[]> = async (interview_number:number) => {
    return axios.get<TranscriptLine[]>(`https://lwapc6yq7cyz57sxzuvzv2u6ou0nkrar.lambda-url.eu-north-1.on.aws/transcript?interview_number=${interview_number}`)
    .then((response)=>{return response.data});
}


export const getInterviewer:(interview_number:number)=>Promise<SpeakerEnum> = async (interview_number:number) => {
    return axios.get<SpeakerEnum>(`https://lwapc6yq7cyz57sxzuvzv2u6ou0nkrar.lambda-url.eu-north-1.on.aws/interviewer-id?interview_number=${interview_number}`)
    .then((response)=>{return response.data});
}

export const getKeywords:(interview_number:number)=>Promise<string[]> = async (interview_number:number) => {
    return axios.get<Keywords>(`https://lwapc6yq7cyz57sxzuvzv2u6ou0nkrar.lambda-url.eu-north-1.on.aws/keywords?interview_number=${interview_number}`)
    .then((response)=>{return response.data.keywords});
}

export const getSummary:(interview_number:number)=>Promise<SummaryLine[]> = async (interview_number:number) => {
    return axios.get<SummarySegments>(`https://lwapc6yq7cyz57sxzuvzv2u6ou0nkrar.lambda-url.eu-north-1.on.aws/summary?interview_number=${interview_number}`)
    .then((response)=>{return response.data.segments});
}


export const getRelevance:(interview_number:number)=>Promise<SummaryLine[]> = async (interview_number:number) => {
    return axios.get<SummarySegments>(`https://lwapc6yq7cyz57sxzuvzv2u6ou0nkrar.lambda-url.eu-north-1.on.aws/relevance?interview_number=${interview_number}`)
    .then((response)=>{return response.data.segments});
}
