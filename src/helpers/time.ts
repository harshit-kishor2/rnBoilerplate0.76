// time related utils using dayjs library https://day.js.org/
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

// Format a date to a readable string (e.g., 'January 1, 2024')
export const formatDate = (date: string | Date, format: string = 'MMMM D, YYYY'): string => {
  return dayjs(date).format(format);
};

// Get the current time in a specific timezone
export const getCurrentTimeInZone = (tz: string = 'UTC'): string => {
  return dayjs().tz(tz).format('YYYY-MM-DD HH:mm:ss');
};

// Add time to a date (e.g., add 5 days)
export const addTime = (date: string | Date, value: number, unit: dayjs.ManipulateType = 'day'): string => {
  return dayjs(date).add(value, unit).format();
};

// Subtract time from a date (e.g., subtract 2 hours)
export const subtractTime = (date: string | Date, value: number, unit: dayjs.ManipulateType = 'hour'): string => {
  return dayjs(date).subtract(value, unit).format();
};

// Calculate the difference between two dates in a specific unit (e.g., days)
export const getDifference = (date1: string | Date, date2: string | Date, unit: dayjs.ManipulateType = 'day'): number => {
  return dayjs(date1).diff(dayjs(date2), unit);
};


// Get the relative time from now (e.g., '3 days ago', 'in 5 minutes')
export const getRelativeTimeFromNow = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

// Convert a duration to a human-readable format (e.g., '2 hours 15 minutes')
export const formatDuration = (milliseconds: number): string => {
  return dayjs.duration(milliseconds).humanize();
};

// Check if a date is in the past
export const isPast = (date: string | Date): boolean => {
  return dayjs(date).isBefore(dayjs());
};

// Check if a date is today
export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

// Convert a date to UTC format
export const toUTC = (date: string | Date): string => {
  return dayjs(date).utc().format();
};

// Convert a date to a specific timezone
export const toTimezone = (date: string | Date, tz: string = 'UTC'): string => {
  return dayjs(date).tz(tz).format('YYYY-MM-DD HH:mm:ss');
};

// Get the start of the day for a date
export const startOfDay = (date: string | Date): string => {
  return dayjs(date).startOf('day').format();
};

// Get the end of the day for a date
export const endOfDay = (date: string | Date): string => {
  return dayjs(date).endOf('day').format();
};
