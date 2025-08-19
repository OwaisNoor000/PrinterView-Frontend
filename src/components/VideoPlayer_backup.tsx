import { useState,useEffect, useRef  } from "react"
import interview from "../assets/temporary/interview.mp4";
import {useAppStore} from "../context/AppStore";
import { roundToDecimalPlaces } from "../utils/Util";

export type VideoPlayerProps = {
    interviewee_name:string,
    className:string

}





export default function VideoPlayer(){
    const video_ref = useRef<HTMLVideoElement>(null);
    const [playing,setPlaying] = useState(false);
    const updateVideoProgress = useAppStore((state)=>state.setVideoProgress);
    console.log(playing)

    useEffect(()=>{

        // set Interval to update video progress
        setInterval(()=>{
            if (video_ref.current != null){
                let time = roundToDecimalPlaces(video_ref.current.currentTime,2);
                updateVideoProgress(time);
            }
        },500);
    },[]);

    // useEffect(()=>{
    //     if(video_ref.current != null){
    //         // assign video element reference to context
    //         setVideoRef(video_ref as RefObject<HTMLVideoElement>);
    //     }
    // },[video_ref]);

    return (
      <>
        <video src={interview} playsInline controls ref={video_ref} onPlay={()=>setPlaying(true)} 
        onPause={()=>setPlaying(false)} className=""></video>
      </>  
    );

}