import { useEffect, useState } from "react";
import { useAppStore } from "../context/AppStore";

type visibility = "block"|"hidden";

export default function CandidateDDList(){
    const interview_number = useAppStore((state)=>state.interview_number);
    const setInterviewNumber = useAppStore((state)=>state.setInterviewNumber);
    const [candidate_name,setCandidateName] = useState<string>("");
    const setYoutubeId = useAppStore((state)=>state.setYoutubeId);
    const [menu_visible, setMenuVisibility] = useState<visibility>("hidden");

    useEffect(()=>{
       if(interview_number == 1){
        setCandidateName("Andrea Bakkali");
        setYoutubeId("sjTxmq68RXU");
       } else if (interview_number == 2){
        setCandidateName("Chris Kennedy");
        setYoutubeId("OVAMb6Kui6A");
       }else if (interview_number ==3){
        setCandidateName("Nicholas Wang");
        setYoutubeId("ExJZAegsOis");
        
       }else{
        setCandidateName("Unknown Candidate");
       }
    },[interview_number]);

    const toggleMenu = ()=>{
        if (menu_visible == "hidden"){
            setMenuVisibility("block");
        }else{
            setMenuVisibility("hidden");
        }
    }

    const selectMenuOption = (index:number)=>{
        setInterviewNumber(index);
        setMenuVisibility("hidden");
    }
    

    return (
        <div className="relative ml-2">
            <span className="flex flex-row hover:cursor-pointer" onClick={toggleMenu}>{candidate_name} <span className="mx-2">▼</span></span>
            <div className={"border-black border-1 absolute bg-white w-[150px] " + menu_visible}>
                <div className="hover:cursor-pointer hover:bg-gray-200 py-2" onClick={()=>{selectMenuOption(1)}}> Andrea Bakkali</div>
                <div className="hover:cursor-pointer hover:bg-gray-200 py-2" onClick={()=>{selectMenuOption(2)}}> Chris Kennedy</div>
                <div className="hover:cursor-pointer hover:bg-gray-200 py-2" onClick={()=>{selectMenuOption(3)}}> Nicholas Wang</div>
            </div>
        </div>
    )
}