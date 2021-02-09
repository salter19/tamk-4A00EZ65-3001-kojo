export const formatDateTime = (str) => {
  const date = formatDate(str);
  const time = formatTime(str)
  return date + ' ' + time;
}

export const formatDate = (str) => {
  let tmp_date = str.split(new RegExp('[-:T]'), 3);
  return tmp_date.reverse().join('.');
}

export const formatTime = (str) => {
  return str.split(new RegExp('[-T:]'), 5).slice(3).join(':');
}

export const formatDateTimeFromDate = (dateStr) => {
   // if Date object, proceed with funcs
   const date = dateStr.getDate();
   const month = dateStr.getMonth() +1;
   const year = dateStr.getFullYear();
   const hour = dateStr.getHours();
   let minute = dateStr.getMinutes();

   // add zero in front, if one digit
   if (minute < 10) {
     const tmp = `0+${minute}`;
     minute = tmp;
   }
   return (date + "." + month + "." + year + " " + hour + ":" + minute);
}
