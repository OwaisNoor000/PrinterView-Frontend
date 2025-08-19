import {  useRef,  } from "react";
import {type YouTubeEvent} from 'react-youtube';
import YouTube from "react-youtube";

export default function YouTubePlayer(){

  const vidRef = useRef<YouTube>(null);

  const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
  
  const logProgress = (event:YouTubeEvent)=>{
    console.log(event.target.getCurrentTime());
  }
  
  const skip = ()=>{
    vidRef.current?.getInternalPlayer().seekTo(20);
    console.log(vidRef.current?.getInternalPlayer());
  }

  return (
    <div>
    <YouTube ref={vidRef} videoId="sjTxmq68RXU" opts={opts} onPause={logProgress} />
    <br/>
    <button onClick={()=>{skip()}}>Go to 5:00</button>
    </div>
  )
}