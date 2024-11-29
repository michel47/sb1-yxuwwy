export class PasswordManager {
  constructor(input, keypadContainer, onUpdate) {
    this.input = input;
    this.password = '';
    this.isVisible = false;
    this.onUpdate = onUpdate;
    
    this.handleInput = this.handleInput.bind(this);
    this.setupVisibilityToggle();
  }

  handleInput(key) {
    if (key === 'backspace') {
      this.password = this.password.slice(0, -1);
    } else {
      this.password += key;
    }
    
    this.updateDisplay();
    this.onUpdate(this.password);
  }

  setupVisibilityToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'visibility-toggle';
    toggle.textContent = '👁';
    
    toggle.addEventListener('mouseover', () => {
      this.input.type = 'text';
    });
    
    toggle.addEventListener('mouseout', () => {
      if (!this.isVisible) {
        this.input.type = 'password';
      }
    });
    
    toggle.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      this.input.type = this.isVisible ? 'text' : 'password';
      toggle.textContent = this.isVisible ? '🙈' : '👁';
    });
    
    this.input.parentNode.appendChild(toggle);
  }

  updateDisplay() {
    this.input.value = this.password;
  }
}