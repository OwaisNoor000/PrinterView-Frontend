import { SpeakerEnum } from "./SpeakerEnum"

export type TranscriptLine = {
    text:string,
    speaker:SpeakerEnum,
    start:string,
    end:string,
}

