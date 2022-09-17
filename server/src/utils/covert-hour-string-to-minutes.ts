// 18:00 => 1080

export const convertHourStringToMinutes = (time: string) => {
       const [hour, minutes] = time.split(':').map(Number);
       const timeInMinutes = hour * 60 + minutes;
       
       return timeInMinutes;
}

