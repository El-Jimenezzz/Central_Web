/**
 * Validates phone number format.
 * Accepts: digits, spaces, and optional leading +
 * Requires: minimum 7 digits, maximum 15 digits
 */
export function isValidPhone(phone: string): boolean {
  if (!/^\+?[\d\s]+$/.test(phone)) return false;
  const digitsOnly = phone.replace(/[^\d]/g, "");
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * Validates that a date/time combination is at least 12 hours in the future.
 */
export function isAtLeast12HoursAhead(date: string, time: string): boolean {
  const selected = new Date(`${date}T${time}`);
  if (isNaN(selected.getTime())) return false;
  const minAllowed = new Date(Date.now() + 12 * 60 * 60 * 1000);
  return selected >= minAllowed;
}
