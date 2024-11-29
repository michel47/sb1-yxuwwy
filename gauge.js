import { createGradient } from './utils/colorUtils.js';
import { updateLabelPosition, setupGaugeStyles, setupGaugeBarStyles, setupLabelStyles } from './utils/domUtils.js';

export function updateGauge(container, log10Guesses) {
  // Initialize gauge elements if they don't exist
  if (!container.querySelector('.gauge-bar')) {
    setupGaugeElements(container);
  }

  const gaugeBar = container.querySelector('.gauge-bar');
  const gaugeLabel = container.querySelector('.gauge-label');
  const scoreText = container.querySelector('.score-text');
  
  // Calculate percentage (max at 15 for log10Guesses)
  const percentage = Math.min(log10Guesses / 15 * 100, 100);
  
  // Update gauge bar
  gaugeBar.style.width = `${percentage}%`;
  gaugeBar.style.backgroundImage = createGradient(percentage);
  
  // Update label
  gaugeLabel.textContent = `log₁₀: ${log10Guesses.toFixed(2)}`;
  updateLabelPosition(gaugeLabel, percentage);
  
  // Update score text
  const strengthText = getStrengthText(log10Guesses);
  scoreText.textContent = strengthText;
}

function setupGaugeElements(container) {
  // Clear existing content
  container.innerHTML = '';
  
  // Create gauge wrapper with relative positioning
  const gaugeWrapper = document.createElement('div');
  gaugeWrapper.style.position = 'relative';
  gaugeWrapper.style.marginBottom = '2rem';
  
  // Create and style gauge background
  const gauge = document.createElement('div');
  setupGaugeStyles(gauge);
  
  // Create and style gauge bar
  const gaugeBar = document.createElement('div');
  gaugeBar.className = 'gauge-bar';
  setupGaugeBarStyles(gaugeBar);
  
  // Create and style label
  const label = document.createElement('div');
  label.className = 'gauge-label';
  setupLabelStyles(label);
  
  // Create score text
  const scoreText = document.createElement('div');
  scoreText.className = 'score-text';
  scoreText.style.textAlign = 'center';
  scoreText.style.marginTop = '2rem';
  scoreText.style.fontWeight = '500';
  
  // Assemble the elements
  gauge.appendChild(gaugeBar);
  gaugeWrapper.appendChild(gauge);
  gaugeWrapper.appendChild(label);
  container.appendChild(gaugeWrapper);
  container.appendChild(scoreText);
}

function getStrengthText(log10Guesses) {
  if (log10Guesses < 3) return 'Very Weak: Instant crack';
  if (log10Guesses < 6) return 'Weak: Minutes to crack';
  if (log10Guesses < 8) return 'Fair: Days to crack';
  if (log10Guesses < 10) return 'Strong: Years to crack';
  return 'Very Strong: Centuries to crack';
}