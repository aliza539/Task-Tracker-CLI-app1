export function getCurrentTimestamp() {
  return new Date().toISOString();
}

export function isoToDate(isoString) {
  if (!isoString) return null;
  return isoString.slice(0, 10);
}