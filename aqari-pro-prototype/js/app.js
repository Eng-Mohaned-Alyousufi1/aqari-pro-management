const App = {
  currentUser: null,

  init() {
    this.currentUser = Storage.getCurrentUser();
    this.renderApp();
    Router.init();
    this.updateHeader();
  },

  renderApp() {
    if (!this.currentUser) {
      document.getElementById('app').innerHTML = '<div id="page-content" class="auth-panel" style="width:100%"></div>';
      return;
    }

    document.getElementById('app').innerHTML =
      '<div class="sidebar-overlay" id="sidebarOverlay"></div>' +
      '<aside class="sidebar" id="sidebar">' +
        '<div class="sidebar-header">' +
          '<div class="sidebar-logo">&#1593;</div>' +
          '<div class="sidebar-brand">&#1593;&#1602;&#1575;&#1585;&#1610; &#1576;&#1585;&#1608;<small>&#1605;&#1606;&#1589;&#1577; &#1575;&#1604;&#1593;&#1602;&#1575;&#1585;&#1575;&#1578; &#1575;&#1604;&#1584;&#1603;&#1610;&#1577;</small></div>' +
        '</div>' +
        '<nav class="sidebar-nav" id="sidebarNav"></nav>' +
        '<div class="sidebar-footer">' +
          '<div class="sidebar-user" onclick="App.logout()">' +
            '<div class="avatar">' + this.currentUser.firstName.charAt(0) + '</div>' +
            '<div class="sidebar-user-info">' +
              '<div class="sidebar-user-name">' + this.currentUser.firstName + ' ' + this.currentUser.lastName + '</div>' +
              '<div class="sidebar-user-role">' + this.getRoleLabel(this.currentUser.role) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</aside>' +
      '<div class="main-content">' +
        '<header class="header">' +
          '<button class="header-menu-btn" onclick="App.toggleSidebar()">&#9776;</button>' +
          '<div class="header-search">' +
            '<div class="search-box">' +
              '<input type="text" class="form-input" placeholder="&#1576;&#1581;&#1579; &#1593;&#1602;&#1575;&#1585;&#1575;&#1575;&#1578;..." id="globalSearch" onkeyup="App.handleGlobalSearch(event)">' +
            '</div>' +
          '</div>' +
          '<div class="header-actions">' +
            '<button class="header-btn" onclick="Router.navigate(\'/notifications\')" title="&#1575;&#1604;&#1573;&#1588;&#1593;&#1575;&#1585;&#1575;&#1578;">&#128276;<span class="notification-dot" id="notifDot" style="display:none"></span></button>' +
            '<div class="dropdown">' +
              '<div class="header-profile" onclick="App.toggleProfileMenu(event)">' +
                '<div class="avatar avatar-sm">' + this.currentUser.firstName.charAt(0) + '</div>' +
                '<div class="header-profile-info">' +
                  '<span class="header-profile-name">' + this.currentUser.firstName + '</span>' +
                  '<span class="header-profile-role">' + this.getRoleLabel(this.currentUser.role) + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="dropdown-menu" id="profileMenu">' +
                '<div class="dropdown-item" onclick="Router.navigate(\'/profile\')">&#128100; &#1575;&#1604;&#1605;&#1604;&#1601; &#1575;&#1604;&#1588;&#1582;&#1589;&#1610;</div>' +
                '<div class="dropdown-item" onclick="Router.navigate(\'/settings\')">&#9881; &#1575;&#1604;&#1573;&#1593;&#1583;&#1575;&#1583;&#1575;&#1578;</div>' +
                '<div class="dropdown-divider"></div>' +
                '<div class="dropdown-item" onclick="App.logout()">&#128682; &#1578;&#1587;&#1580;&#1610;&#1604; &#1575;&#1604;&#1582;&#1585;&#1608;&#1580;</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<div id="page-content" class="page-content"></div>' +
      '</div>';

    this.renderSidebar();
    this.updateNotificationDot();
    document.getElementById('sidebarOverlay').addEventListener('click', function() { App.closeSidebar(); });
  },

  renderSidebar() {
    var nav = document.getElementById('sidebarNav');
    if (!nav) return;
    var role = this.currentUser.role;
    var navConfigs = SidebarNav;
    nav.innerHTML = navConfigs[role] || '';
  },

  getRoleLabel(role) {
    var labels = { seeker: '\u0628\u0627\u062d\u062b', owner: '\u0645\u0627\u0644\u0643', broker: '\u0648\u0633\u064a\u0637', admin: '\u0645\u062f\u064a\u0631' };
    return labels[role] || role;
  },

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
  },

  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
  },

  toggleProfileMenu(e) {
    e.stopPropagation();
    var menu = document.getElementById('profileMenu');
    menu.classList.toggle('active');
    document.addEventListener('click', function closeMenu() {
      menu.classList.remove('active');
      document.removeEventListener('click', closeMenu);
    });
  },

  updateHeader() {
    var dot = document.getElementById('notifDot');
    if (dot && this.currentUser) {
      var count = getUnreadNotificationsCount(this.currentUser.id);
      dot.style.display = count > 0 ? 'block' : 'none';
    }
  },

  updateNotificationDot() {
    this.updateHeader();
  },

  handleGlobalSearch(e) {
    if (e.key === 'Enter') {
      var q = e.target.value.trim();
      if (q) {
        Router.navigate('/search?q=' + encodeURIComponent(q));
      }
    }
  },

  logout() {
    Modal.confirm(
      '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
      '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c\u061f',
      function() {
        Storage.logout();
        window.location.hash = '/login';
        window.location.reload();
      }
    );
  },

  showConfirmDialog(title, message, onConfirm) {
    Modal.confirm(title, message, onConfirm);
  }
};
