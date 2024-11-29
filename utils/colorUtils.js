export function getColorForStrength(value) {
  // Convert value to a hue between red (0) and green (120)
  const hue = value * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

export function createGradient(percentage) {
  const startColor = getColorForStrength(0);
  const endColor = getColorForStrength(percentage / 100);
  
  if (percentage <= 50) {
    return `linear-gradient(to right, ${startColor}, ${endColor})`;
  } else {
    const midColor = getColorForStrength(0.5);
    const midPoint = (50 / percentage) * 100;
    return `linear-gradient(to right, ${startColor}, ${midColor} ${midPoint}%, ${endColor})`;
  }
}