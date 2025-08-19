import { useState,useEffect, useRef, type RefObject } from "react"
import ReactPlayer from "react-player";
import interview from "../assets/temporary/interview.mp4";
import {useAppStore} from "../context/AppStore";
import { roundToDecimalPlaces } from "../utils/Util";

export type VideoPlayerProps = {
    interviewee_name:string,
    className:string

}

type PlayEventHolderType = {
    playing:boolean;
}




export default function VideoPlayer({interviewee_name,className}:VideoPlayerProps){
    const video_ref = useRef<HTMLVideoElement>(null);
    const [playing,setPlaying] = useState(false);
    const video_progress = useAppStore((state)=>state.video_progress);
    const updateVideoProgress = useAppStore((state)=>state.setVideoProgress);
    const setVideoRef = useAppStore((state)=>state.setVideoReference);

    useEffect(()=>{

        // set Interval to update video progress
        setInterval(()=>{
            if (video_ref.current != null){
                let time = roundToDecimalPlaces(video_ref.current.currentTime,2);
                updateVideoProgress(time);
            }
        },500);
    },[]);

    useEffect(()=>{
        if(video_ref.current != null){
            // assign video element reference to context
            setVideoRef(video_ref as RefObject<HTMLVideoElement>);
        }
    },[video_ref]);

    return (
      <>
        <video src={interview} playsInline controls ref={video_ref} onPlay={()=>setPlaying(true)} 
        onPause={()=>setPlaying(false)} className={className}></video>
      </>  
    );

}