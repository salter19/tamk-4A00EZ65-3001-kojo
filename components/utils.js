export const formatDateTime = (str) => {
  const date = formatDate(str);
  const time = formatTime(str)
  return date + ' ' + time;
}

export const formatDate = (str) => {
  let tmp_date = str.split(new RegExp('[-\\s]'), 3);
  return tmp_date.slice(0, 1);
}

export const formatTime = (str) => {
  let tmp_time =  str.split(new RegExp('[-\\s]'), 5).slice(1);
  return tmp_time;
}

export const formatDateTimeFromStr = (dateStr) => {
  let day = dateStr.split(new RegExp('[d+/.]'), 5).slice(0,1).join();
  let month = dateStr.split(new RegExp('[-\\.]'), 2).slice(1).join();
  const tmp_year = dateStr.split(new RegExp('[-\\.]'), 3).slice(2).join();
  let year = tmp_year.split(new RegExp('[-\\s]'), 2).slice(0,1).join();
  const tmp_hour = dateStr.split(new RegExp('[-\\s]'), 2).slice(1).join();
  let hour = tmp_hour.split(new RegExp('[-\\:]'), 2).slice(0, 1).join();
  let minutes = tmp_hour.split(new RegExp('[-\\:]'), 2).slice(1).join();
   
  // fix month (array indexing)
  month = Number.parseInt(month) - 1;
  
  const event = new Date(year, month, day, hour, minutes);
  return event;
}

export const formatDateTimeFromDate = (dateObj) => {
   // if Date object, proceed with funcs
   const date = dateObj.getDate();
   const month = dateObj.getMonth() +1;
   const year = dateObj.getFullYear();
   const hour = dateObj.getHours();
   let minute = dateObj.getMinutes();

   // add zero in front, if one digit
   if (minute < 10) {
     const tmp = `0${minute}`;
     minute = tmp;
   }
   return (date + "." + month + "." + year + " " + hour + ":" + minute);
}
