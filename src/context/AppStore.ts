import type { Ref, RefObject } from "react";
import type YouTube from "react-youtube";
import {create} from "zustand";


interface AppState {
  video_progress: number
  candidate_name:string
  video_reference:RefObject<YouTube>|null
  interview_number:number
  youtube_id:string
  setVideoProgress: (progress: number) => void
  setCandidateName: (name: string) => void
  setVideoReference:(video_reference:RefObject<YouTube>)=>void
  changeVideoTime: (seconds:number) => void
  setInterviewNumber: (num:number)=>void
  setYoutubeId: (yt_id:string)=>void
}

export const useAppStore = create<AppState>()((set) => ({
    video_progress: 0,
    candidate_name: "candidate",
    video_reference:null,
    interview_number:1,
    youtube_id:"sjTxmq68RXU",
    setVideoProgress: (progress) => set((state) => ({ video_progress: progress })),
    setCandidateName: (name) => set((state)=>({candidate_name:name})),
    setVideoReference:(reference) => set((state)=>({video_reference:reference})),
    setInterviewNumber:(num_input) => set((state) => ({ interview_number:num_input })),
    setYoutubeId:(yt_id) => set((state) => ({ youtube_id:yt_id })),
    changeVideoTime: (seconds) => set((state)=>{
      if(state.video_reference && state.video_reference.current){
        console.log("time changed");
        state.video_reference.current.getInternalPlayer().seekTo(seconds);
      }
      return state;
    }),

}))