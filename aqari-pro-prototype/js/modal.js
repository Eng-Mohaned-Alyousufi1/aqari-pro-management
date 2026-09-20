const Modal = {
  show(options) {
    const { title, content, size = '', footer = '', onClose = null, onConfirm = null, confirmText = 'تأكيد', cancelText = 'إلغاء', showClose = true, className = '' } = options;

    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal ${size ? 'modal-' + size : ''} ${className}">
        <div class="modal-header">
          <h3>${title}</h3>
          ${showClose ? '<button class="btn btn-ghost btn-icon modal-close-btn" aria-label="إغلاق">&times;</button>' : ''}
        </div>
        <div class="modal-body">${content}</div>
        ${footer || onConfirm ? `
          <div class="modal-footer">
            ${footer || `
              <button class="btn btn-secondary modal-cancel-btn">${cancelText}</button>
              <button class="btn btn-primary modal-confirm-btn">${confirmText}</button>
            `}
          </div>
        ` : ''}
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    const closeModal = () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
      if (onClose) onClose();
    };

    overlay.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
    overlay.querySelector('.modal-cancel-btn')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    const confirmBtn = overlay.querySelector('.modal-confirm-btn');
    if (confirmBtn && onConfirm) {
      confirmBtn.addEventListener('click', () => {
        onConfirm(closeModal, overlay);
      });
    }

    return { close: closeModal, overlay };
  },

  confirm(title, message, onConfirm, options = {}) {
    return this.show({
      title,
      content: `<p>${message}</p>`,
      confirmText: options.confirmText || 'تأكيد',
      cancelText: options.cancelText || 'إلغاء',
      onConfirm: (close) => {
        onConfirm();
        close();
      }
    });
  },

  alert(title, message, options = {}) {
    return this.show({
      title,
      content: `<p>${message}</p>`,
      footer: `<button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">${options.buttonText || 'حسناً'}</button>`,
      showClose: true
    });
  },

  close() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  }
};
