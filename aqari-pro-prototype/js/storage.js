const Storage = {
  get(key) {
    try {
      const val = localStorage.getItem('aqari_' + key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },

  set(key, value) {
    try {
      localStorage.setItem('aqari_' + key, JSON.stringify(value));
    } catch (e) { console.error('Storage error:', e); }
  },

  remove(key) {
    localStorage.removeItem('aqari_' + key);
  },

  clear() {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('aqari_')) localStorage.removeItem(k);
    });
  },

  getCurrentUser() {
    return this.get('currentUser');
  },

  setCurrentUser(user) {
    this.set('currentUser', user);
  },

  logout() {
    this.remove('currentUser');
  }
};
