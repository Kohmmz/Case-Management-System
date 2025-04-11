import { format } from 'date-fns';

// Format a date into a readable string (e.g., "April 08, 2025")
export const formatDate = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy');
};

// Format a date into a specific format (e.g., "2025-04-08")
export const formatDateForInput = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

// Compare two dates: returns true if date1 is before date2
export const isBefore = (date1, date2) => {
  return new Date(date1) < new Date(date2);
};

// Compare two dates: returns true if date1 is after date2
export const isAfter = (date1, date2) => {
  return new Date(date1) > new Date(date2);
};

// Calculate the difference between two dates (in days)
export const dateDifferenceInDays = (date1, date2) => {
  const diffInTime = new Date(date2) - new Date(date1);
  return diffInTime / (1000 * 3600 * 24); // Convert from milliseconds to days
};