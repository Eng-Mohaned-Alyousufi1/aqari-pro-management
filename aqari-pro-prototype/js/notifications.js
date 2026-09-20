const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(options) {
    this.init();
    const { type = 'info', title, message, duration = 4000 } = options;

    const icons = {
      success: '&#10004;',
      error: '&#10006;',
      warning: '&#9888;',
      info: '&#8505;'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="إغلاق">&times;</button>
    `;

    this.container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  },

  success(title, message) { this.show({ type: 'success', title, message }); },
  error(title, message) { this.show({ type: 'error', title, message }); },
  warning(title, message) { this.show({ type: 'warning', title, message }); },
  info(title, message) { this.show({ type: 'info', title, message }); }
};
