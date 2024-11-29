export function calculateStrength(log10Guesses) {
  if (log10Guesses < 3) return 0;
  if (log10Guesses < 6) return 1;
  if (log10Guesses < 8) return 2;
  if (log10Guesses < 10) return 3;
  return 4;
}

export function formatCrackTime(seconds) {
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  return `${Math.round(seconds / 31536000)} years`;
}