import {getRelevance  } from "../hooks/InterviewHooks";
import { createRef, useEffect, useRef, useState,  type RefObject } from "react";
import { convertSecondsToTimeStamp } from "../utils/Util";
import { useAppStore } from "../context/AppStore";
import type { SummaryLine } from "../types/Summary";


type SummaryProps = {
    className:string
}

export default function Relevance({className}:SummaryProps){
    const [lines, setLines] = useState<SummaryLine[]>([]);
    const seconds = useAppStore((state)=>state.video_progress);
    const lineRefs = useRef<RefObject<HTMLDivElement>[]>([]);
    const changeVideoTime:(seconds:number)=>void = useAppStore(state=>state.changeVideoTime);
    const interview_number = useAppStore((state)=>state.interview_number);
    const youtube_id = useAppStore((state)=>state.youtube_id);

    
    useEffect(()=>{
    

    // Fetch transcript data
       const fetchSummaryData = async ()=>{
            const res = await getRelevance(interview_number);
            console.log(res);
            setLines(res);
       }

       fetchSummaryData();
    },[youtube_id]);
    
    
    if(lineRefs.current.length != lines.length){
        lineRefs.current = Array(lines.length)
        .fill(null)
        .map((_,i)=>lineRefs.current[i] || createRef());
    }

    // Hook to automatically scroll to current transcript
    const scrollToElement = (element_index:number)=>{
        let {current} = lineRefs.current[element_index];
        if (current!=null){
            current.scrollIntoView({behavior:"smooth"});
        }
    }
    
    useEffect(()=>{
        let i = 0;
        for (const line of lines){
            if (seconds >= parseFloat(line.start_time) && seconds <= parseFloat(line.end_time)){
                scrollToElement(i);
            }
            i++;
        }
    },[seconds]);
    
    
    const jumpToTime = (seconds:string) => {
        console.log("start of func")
        changeVideoTime(parseFloat(seconds));
        console.log("end of func")
    }
    
    return (
        <div className={"flex flex-col space-y-2  overflow-auto " + className}>
            <span className="font-bold text-sm">Resume Relevance</span>
            <div className="">
            {
                lines.map((line,index)=>(
                    <div className="text-xs my-1 cursor-pointer hover:italic " ref={lineRefs.current[index]}
                    onClick={()=>{jumpToTime(line.start_time)}}>
                        <b>[{convertSecondsToTimeStamp(line.start_time)}] - [{convertSecondsToTimeStamp(line.end_time)}]</b> : {line.summary}
                    </div>
                ))
            }
            </div>
        </div>
    )
}