import zxcvbn from 'zxcvbn';
import { VirtualKeypad } from './js/keypad.js';
import { PasswordManager } from './js/passwordManager.js';
import { updateGauge } from './gauge.js';
import { updateFeedback } from './feedback.js';

const passwordInput = document.querySelector('#password');
const keypadContainer = document.querySelector('#keypad');
const gaugeContainer = document.querySelector('.gauge-container');
const feedbackContainer = document.querySelector('.feedback-container');

function checkPasswordStrength(password) {
  const result = zxcvbn(password);
  const log10Guesses = Math.log10(result.guesses);
  
  updateGauge(gaugeContainer, log10Guesses);
  updateFeedback(feedbackContainer, result);
}

const passwordManager = new PasswordManager(
  passwordInput,
  keypadContainer,
  checkPasswordStrength
);

new VirtualKeypad(
  keypadContainer,
  (key) => passwordManager.handleInput(key)
);

// Initial check with empty password
checkPasswordStrength('');