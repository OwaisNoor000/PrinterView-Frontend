import { useEffect, useRef, type RefObject } from "react"
import {useAppStore} from "../context/AppStore";
import YouTube from "react-youtube";

export type VideoPlayerProps = {
    interviewee_name:string,
    className:string

}





export default function VideoPlayer({interviewee_name,className}:VideoPlayerProps){
    const video_ref = useRef<YouTube>(null);
    const youtube_id = useAppStore((state)=>state.youtube_id);
    const updateVideoProgress = useAppStore((state)=>state.setVideoProgress);
    const setVideoRef = useAppStore((state)=>state.setVideoReference);

    interviewee_name;
    className;

      const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    useEffect(()=>{

        // set Interval to update video progress
        setInterval(async ()=>{
            if (video_ref.current != null){
                let currentTime:number = await video_ref.current.getInternalPlayer().getCurrentTime();
                updateVideoProgress(currentTime);
                // console.log(currentTime);
            }
        },500);
    },[]);

    useEffect(()=>{
        if(video_ref.current != null){
            // assign video element reference to context
            setVideoRef(video_ref as RefObject<YouTube>);
        }
    },[video_ref]);

    return (
      <>
        {/* <video src={interview} playsInline controls onPlay={()=>setPlaying(true)} 
        onPause={()=>setPlaying(false)} className={className}></video> */}
        
        <YouTube ref={video_ref} videoId={youtube_id}
        opts={opts}/>
      </>  
    );

}