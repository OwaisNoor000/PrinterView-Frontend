import { PiStarFourFill } from "react-icons/pi";
import Profile from "./Profile";
import CandidateDDList from "./CandidateDDList";


export default function Header(){

    return (
        <header className="flex flex-row justify-between items-center border-b-1 border-gray-300 w-full">
            <div className=" flex flex-row justify-start items-center space-x-4 m-4">
                <PiStarFourFill />
                <span className="font-bold text-sm">PrinterView AI</span>
            </div>
            <div className="text-md flex flex-row justify-center items-center">
                Interview Analysis for <CandidateDDList/>
            </div>
            <div className=" flex flex-row justify-end items-center text-xs space-x-4 m-4">
                <span>Readme</span>
                <Profile/>
            </div>
        </header>
    )
}