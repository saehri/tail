// @ convertToTime(time: string): {hours: number, minutes: number} | 'invalid'
// The returned hours is in 24 hours format
export function convertToTime(
  time: string
): {hours: number; minutes: number} | 'invalid' {
  // handle the time input for format HH:MM else pass it to other conditional
  const hasColons: boolean = time.includes(':');
  if (hasColons) {
    // check if the string fits the HH:MM format else return 'invalid'
    const splittedString: string[] = time.split(':');
    if (splittedString.length === 2)
      return convertTimeStringWithColon(splittedString);
    return 'invalid';
  }

  // handle the time input for HHMM, HMM, HH, and H format
  const isNumber = Number(time);
  if (!isNumber) return 'invalid'; // makes sure the string can be casted to integer
  return convertTimeString(time);
}

export function getFormattedTime(date: Date) {
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const f_hours = hours.length === 1 ? `0${hours}` : hours;
  const f_minutes = minutes.length === 1 ? `0${minutes}` : minutes;

  return {f_hours, f_minutes};
}

function convertTimeString(
  time: string
): {hours: number; minutes: number} | 'invalid' {
  let hours: string = '';
  let minutes: string = '';

  // check for each case string length
  // and determine the string slicing
  if (time.length === 4) {
    hours = extractTimes(time.slice(0, 2));
    minutes = extractTimes(time.slice(2));
  }

  if (time.length === 3) {
    hours = extractTimes(time.slice(0, 1));
    minutes = extractTimes(time.slice(1));
  }

  if (time.length === 2) {
    hours = extractTimes(time);
    minutes = '0';
  }

  if (time.length === 1) {
    hours = extractTimes(time);
    minutes = '0';
  }

  // check the validity
  const isHoursValid: boolean | number = checkHoursValidity(hours);
  const isMinutesValid: boolean | number = checkMinutesValidity(minutes);

  if (!isHoursValid || !isMinutesValid) return 'invalid';
  return {hours: Number(hours), minutes: Number(minutes)};
}

function convertTimeStringWithColon(
  time: string[]
): {hours: number; minutes: number} | 'invalid' {
  const hours = extractTimes(time[0]);
  const minutes = extractTimes(time[1]);
  const isHoursValid = checkHoursValidity(hours);
  const isMinutesValid = checkMinutesValidity(minutes);

  if (!isHoursValid || !isMinutesValid) return 'invalid';
  return {hours: Number(hours), minutes: Number(minutes)};
}

function extractTimes(times: string) {
  if (times === '0') return times;
  if (times[0] === '0') return times.slice(1);
  return times;
}

function checkHoursValidity(hours: string): boolean | number {
  if (hours === '0') return true;
  return hours.length <= 2 && Number(hours) && Number(hours) <= 24;
}

function checkMinutesValidity(minutes: string): boolean | number {
  if (minutes === '0') return true;
  return minutes.length <= 2 && Number(minutes) && Number(minutes) <= 99;
}
