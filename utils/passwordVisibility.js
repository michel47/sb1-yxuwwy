export function setupPasswordVisibility(inputWrapper) {
  const toggleIcon = document.createElement('span');
  Object.assign(toggleIcon.style, {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '1.2rem',
    color: '#666'
  });
  
  toggleIcon.textContent = '👁';
  let isVisible = false;
  
  const input = inputWrapper.querySelector('input');
  
  // Mouse over/out events for temporary visibility
  toggleIcon.addEventListener('mouseover', () => {
    input.type = 'text';
  });
  
  toggleIcon.addEventListener('mouseout', () => {
    if (!isVisible) {
      input.type = 'password';
    }
  });
  
  // Click event for persistent visibility toggle
  toggleIcon.addEventListener('click', () => {
    isVisible = !isVisible;
    input.type = isVisible ? 'text' : 'password';
    toggleIcon.textContent = isVisible ? '🙈' : '👁';
  });
  
  return toggleIcon;
}