import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";
import TestLogger from "../components/TestLogger";
import Transcript from "../components/Transcript";
import Keywords from "../components/Keywords";
import Summary from "../components/Summary";
import Relevance from "../components/Relevance";
import YouTubePlayer from "../components/YouTubePlayer";

export default function MainView(){
    return (
        // <YouTubePlayer/>
        <div className="h-screen w-full flex flex-col">
            <Header/>
            <main className="w-full flex flex-row flex-1 justify-start items-start min-h-0">
                <div className="w-1/2 p-4 h-full flex flex-col">
                    <VideoPlayer interviewee_name="Andrea Bakkali" className=""/>  
                    <Keywords className="w-full mt-10 h-full overflow-scroll no-scrollbar"/>
                </div>
                <div className="w-1/2 p-4 h-full flex flex-row">
                    <Transcript className="w-1/2 h-full no-scrollbar px-4"/>
                    <div className="w-1/2 flex flex-col justify-between">
                        <Summary className="w-full h-[48%] no-scrollbar px-4 "/>
                        
                        <Relevance className="w-full h-[48%] no-scrollbar px-4"/>
                    </div>
                </div>
            </main>
            <aside></aside>
        </div>
    )
}

