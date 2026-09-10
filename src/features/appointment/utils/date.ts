




export function formatDate(date:string){
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US",{
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}


export function getWeekdayName(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, { weekday: "short" });
}


export function addDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}


export function formatTime(time:string){
    const[hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0)


    return date.toLocaleTimeString("enu-US",{
        hour: "numeric",
        minute: "2-digit",
    })
}


/** True if the appointment's date + time has already passed relative to now. */
export function isPastDateTime(date: string, time: string): boolean {
  if (!date || !time) return false;
  return new Date(`${date}T${time}`).getTime() < Date.now();
}
 