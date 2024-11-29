export function updateLabelPosition(label, percentage) {
  if (percentage < 50) {
    label.style.left = `${percentage}%`;
    label.style.right = 'auto';
    label.style.textAlign = 'left';
    label.style.marginLeft = '5px';
  } else {
    label.style.left = 'auto';
    label.style.right = `${100 - percentage}%`;
    label.style.textAlign = 'right';
    label.style.marginRight = '5px';
  }
}

export function setupGaugeStyles(gauge) {
  Object.assign(gauge.style, {
    height: '8px',
    background: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative'
  });
}

export function setupGaugeBarStyles(bar) {
  Object.assign(bar.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '0',
    transition: 'all 0.3s'
  });
}

export function setupLabelStyles(label) {
  Object.assign(label.style, {
    position: 'absolute',
    top: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#666',
    transition: 'all 0.3s'
  });
}