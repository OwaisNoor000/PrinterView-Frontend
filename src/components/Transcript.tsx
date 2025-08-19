import {type Speaker} from "../types/SpeakerEnum";
import { type TranscriptLine} from "../types/Transcript";
import { getInterviewer, getTranscript } from "../hooks/InterviewHooks";
import { createRef, useEffect, useRef, useState,  type RefObject } from "react";
import { convertSecondsToTimeStamp } from "../utils/Util";
import { useAppStore } from "../context/AppStore";

type TranscriptProps = {
    className:string;
}

export default function Transcript({className}:TranscriptProps){
    const [lines, setLines] = useState<TranscriptLine[]>([]);
    const [interviewer,setInterviewer] = useState<Speaker>({"interviewer_id":"SPEAKER_00"});
    const seconds = useAppStore((state)=>state.video_progress);
    const lineRefs = useRef<RefObject<HTMLDivElement>[]>([]);
    const changeVideoTime:(seconds:number)=>void = useAppStore(state=>state.changeVideoTime);
    const interview_number = useAppStore((state)=>state.interview_number);
    const youtube_id = useAppStore((state)=>state.youtube_id);

    
    useEffect(()=>{
    

    // Fetch transcript data
       const fetchTranscriptData = async ()=>{
            const res = await getTranscript(interview_number);
            const res2 = await getInterviewer(interview_number);
            setLines(res);
            setInterviewer(res2);
            console.log(res);
            console.log(res2);
       }

       fetchTranscriptData();

    //    setInterval(()=>{
    //         console.log(seconds);
    //     },1000);
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
            if (seconds >= parseFloat(line.start) && seconds <= parseFloat(line.end)){
                scrollToElement(i);
            }
            i++;
        }

    },[seconds]);
    
    
    const jumpToTime = (seconds:string) => {
        console.log("start of func")
        changeVideoTime(parseFloat(seconds));
        console.log("end of func");
    }
    
    return (
        <div className={"flex flex-col space-y-2  overflow-auto " + className}>
            <span className="font-bold text-sm">Interactive Transcript</span>
            <div className="">
            {
                lines.map((line,index)=>(
                    <div className="text-xs my-1 cursor-pointer hover:italic " ref={lineRefs.current[index]}
                    onClick={()=>{jumpToTime(line.start)}}>
                        <b>[{convertSecondsToTimeStamp(line.start)}]</b> {line.speaker == interviewer.interviewer_id ? "Interviewer" : "Interviewee"}: {line.text}
                    </div>
                ))
            }
            </div>
        </div>
    )
}