import { useEffect, useState } from "react"
import { getKeywords } from "../hooks/InterviewHooks"
import { useAppStore } from "../context/AppStore";

type KeywordsProps = {
    className:string
}

export default function Keywords({className}:KeywordsProps){
    const [keywords,setKeywords] = useState<string[]>([]);
    const interview_number = useAppStore((state)=>state.interview_number);
    const youtube_id = useAppStore((state)=>state.youtube_id);
    
    useEffect(()=>{
        const fetchKeywords = async()=>{
            const fetchedKeywords = await getKeywords(interview_number);
            setKeywords(fetchedKeywords);
        }

        fetchKeywords();
    },[youtube_id])

    return (
        <div className={"flex flex-row space-x-8 space-y-4 flex-wrap "+className }>
            {keywords.map((word,index)=>(                
                <span className="rounded-xl py-1 px-2 bg-gray-100 text-xs" key={index}>{word}</span>
            ))}
        </div>
    )
}