import { formatCrackTime } from './utils/strengthCalculator.js';

export function updateFeedback(container, result) {
  const { feedback, crack_times_seconds } = result;
  const { warning, suggestions } = feedback;
  
  let feedbackText = '<div class="crack-times">';
  feedbackText += '<h3>Estimated crack times:</h3>';
  feedbackText += '<ul>';
  feedbackText += `<li>Online throttled (100/hour): ${formatCrackTime(crack_times_seconds.online_throttling_100_per_hour)}</li>`;
  feedbackText += `<li>Online no throttling (10/s): ${formatCrackTime(crack_times_seconds.online_no_throttling_10_per_second)}</li>`;
  feedbackText += `<li>Offline slow hash (10k/s): ${formatCrackTime(crack_times_seconds.offline_slow_hashing_1e4_per_second)}</li>`;
  feedbackText += `<li>Offline fast hash (10B/s): ${formatCrackTime(crack_times_seconds.offline_fast_hashing_1e10_per_second)}</li>`;
  feedbackText += '</ul></div>';
  
  if (warning) {
    feedbackText += `<p class="warning">${warning}</p>`;
  }
  
  if (suggestions.length > 0) {
    feedbackText += '<div class="suggestions"><h3>Suggestions:</h3><ul>';
    suggestions.forEach(suggestion => {
      feedbackText += `<li>${suggestion}</li>`;
    });
    feedbackText += '</ul></div>';
  }
  
  container.innerHTML = feedbackText;
}