import { useAppStore } from "../context/AppStore";

export default function TestLogger(){
    const second = useAppStore((state)=>state.video_progress);
    
    const logSeconds = ()=>{
        console.log(second);
    }

    return (
        <div className="w-full">
            <button className="text-3xl" onClick={logSeconds}>Click me</button>
        </div>
    )
}