export function roundToDecimalPlaces(num:number, decimalPlaces:number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}



export const convertSecondsToTimeStamp = (seconds_string:string) => {
        const seconds = parseInt(seconds_string);
        const totalSeconds = Math.round(seconds); // round to nearest sec
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    }