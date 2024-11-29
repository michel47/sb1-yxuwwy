export class VirtualKeypad {
  constructor(container, onInput) {
    this.container = container;
    this.onInput = onInput;
    this.currentKeyMap = 0;
    this.keyboardWidth = 5;
    // Default keymaps in case loading fails
    this.keyMaps = [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@", "#", "$", "%", "&", "*", "(", ")", "-", "+"],
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
      ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "{", "}", "|", "\\"],
      ["🐶", "🐱", "🦊", "🐻", "🐼", "🐨", "🦁", "🐯", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🦅", "🦉", "🦋", "🐞", "🐠", "🦈"]
    ];
    this.loadKeyMaps();
  }

  async loadKeyMaps() {
    try {
      const response = await fetch('./data/keyMaps.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.keyMaps = data.keyMaps;
      this.keyboardWidth = data.keyboardWidth || this.keyboardWidth;
    } catch (error) {
      console.warn('Using default key maps:', error);
    } finally {
      this.render();
    }
  }

  createKey(char) {
    const button = document.createElement('button');
    button.className = 'key';
    
    const allCharsSpan = document.createElement('span');
    allCharsSpan.className = 'key-alternatives';
    allCharsSpan.textContent = this.getRotatedChars(char);
    button.appendChild(allCharsSpan);
    
    const mainCharSpan = document.createElement('span');
    mainCharSpan.className = 'key-main';
    mainCharSpan.textContent = char;
    button.appendChild(mainCharSpan);
    
    button.addEventListener('click', () => this.onInput(char));
    
    return button;
  }

  getRotatedChars(char) {
    const index = this.keyMaps[this.currentKeyMap].indexOf(char);
    return this.keyMaps.map(map => map[index]).join(' ');
  }

  createShiftKey() {
    const button = document.createElement('button');
    button.className = 'key shift';
    
    const container = document.createElement('div');
    container.className = 'shift-container';
    
    const left = document.createElement('span');
    left.textContent = '◀';
    left.addEventListener('click', () => this.shiftLeft());
    
    const current = document.createElement('span');
    current.textContent = ['🔠', '🔢', '🔡', '🔣', '🙃'][this.currentKeyMap];
    
    const right = document.createElement('span');
    right.textContent = '▶';
    right.addEventListener('click', () => this.shiftRight());
    
    container.append(left, current, right);
    button.appendChild(container);
    
    return button;
  }

  shiftLeft() {
    this.currentKeyMap = (this.currentKeyMap - 1 + this.keyMaps.length) % this.keyMaps.length;
    this.render();
  }

  shiftRight() {
    this.currentKeyMap = (this.currentKeyMap + 1) % this.keyMaps.length;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    const keys = this.keyMaps[this.currentKeyMap];
    
    keys.forEach(key => {
      this.container.appendChild(this.createKey(key));
    });
    
    const controls = document.createElement('div');
    controls.className = 'keypad-controls';
    
    controls.appendChild(this.createShiftKey());
    
    const backspace = document.createElement('button');
    backspace.className = 'key backspace';
    backspace.textContent = '←';
    backspace.addEventListener('click', () => this.onInput('backspace'));
    controls.appendChild(backspace);
    
    this.container.appendChild(controls);
  }
}