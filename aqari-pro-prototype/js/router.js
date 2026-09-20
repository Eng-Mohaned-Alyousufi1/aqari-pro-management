const Router = {
  routes: {},
  currentRoute: null,
  params: {},

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  getHash() {
    return window.location.hash.slice(1) || '/';
  },

  parseRoute(hash) {
    const parts = hash.split('/').filter(Boolean);
    const params = {};

    if (parts.length >= 2) {
      params.id = parts[1];
    }
    if (parts.length >= 3) {
      params.sub = parts[2];
    }

    const basePath = '/' + (parts[0] || '');

    return { basePath, params, full: hash };
  },

  handleRoute() {
    const hash = this.getHash();
    const { basePath, params } = this.parseRoute(hash);

    this.params = params;
    this.currentRoute = hash;

    const user = Storage.getCurrentUser();
    const publicRoutes = ['/', '/login', '/register', '/otp', '/forgot-password'];

    if (!user && !publicRoutes.includes(basePath)) {
      this.navigate('/login');
      return;
    }

    if (user && publicRoutes.includes(basePath)) {
      const homeRoutes = { seeker: '/home', owner: '/owner/dashboard', broker: '/broker/dashboard', admin: '/admin/dashboard' };
      this.navigate(homeRoutes[user.role] || '/home');
      return;
    }

    let handler = this.routes[hash] || this.routes[basePath];

    if (!handler) {
      handler = this.routes['/404'];
    }

    if (handler) {
      const content = document.getElementById('page-content');
      if (content) {
        content.innerHTML = handler(params);
        content.classList.add('fade-in');
        this.updateActiveLink(hash);
        this.initPageScripts(hash);
        window.scrollTo(0, 0);
      }
    }
  },

  updateActiveLink(hash) {
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.route === hash) {
        link.classList.add('active');
      }
    });
  },

  initPageScripts(route) {
    if (typeof PageScripts !== 'undefined' && PageScripts[route]) {
      setTimeout(() => PageScripts[route](), 100);
    }
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }
};
