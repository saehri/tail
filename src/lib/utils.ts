import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base 36 string
  const randomStr = Math.random().toString(36).substr(2, 5); // Generate random string
  return `${timestamp}${randomStr}`; // Concatenate timestamp and random string
}
