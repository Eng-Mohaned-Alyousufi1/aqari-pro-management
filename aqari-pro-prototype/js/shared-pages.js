var SharedPages = {
  renderProfile: function() {
    var u = App.currentUser;
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a</h1></div></div>';
    html += '<div class="grid-2"><div>';
    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-body" style="text-align:center">';
    html += '<div class="avatar avatar-xl" style="margin:0 auto var(--space-4)">' + u.firstName.charAt(0) + '</div>';
    html += '<h2>' + u.firstName + ' ' + u.lastName + '</h2>';
    html += '<p style="color:var(--text-secondary)">' + u.email + '</p>';
    html += '<span class="badge ' + getStatusBadgeClass(u.kycStatus) + '" style="margin-bottom:var(--space-4)">' + getStatusLabel(u.kycStatus) + '</span>';
    html += '<p style="font-size:var(--font-xs);color:var(--text-muted)">\u0645\u0639\u0646\u062f \u0645\u0646\u0630 ' + formatDate(u.createdAt) + '</p>';
    html += '</div></div>';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u0633\u062c\u064a\u0644</h3></div><div class="card-body">';
    html += '<div class="detail-grid">';
    html += '<div class="detail-item"><span class="detail-label">\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</span><span class="detail-value">' + u.email + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644</span><span class="detail-value font-en" dir="ltr">' + u.phone + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u0627\u0644\u062f\u0648\u0631</span><span class="detail-value">' + getRoleLabel(u.role) + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u062d\u0627\u0644\u0629 \u0627\u0644\u062a\u062d\u0642\u0642</span><span class="detail-value"><span class="badge ' + getStatusBadgeClass(u.kycStatus) + '">' + getStatusLabel(u.kycStatus) + '</span></span></div>';
    html += '</div></div></div></div>';

    html += '<div>';
    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-header"><h3 class="card-title">\u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a</h3></div><div class="card-body">';
    html += '<form id="profileForm" onsubmit="SharedPages.updateProfile(event)">';
    html += '<div class="form-row"><div class="form-group"><label class="form-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644</label><input type="text" name="firstName" class="form-input" value="' + u.firstName + '"></div>';
    html += '<div class="form-group"><label class="form-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0622\u062e\u0631</label><input type="text" name="lastName" class="form-input" value="' + u.lastName + '"></div></div>';
    html += '<div class="form-group"><label class="form-label">\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</label><input type="email" name="email" class="form-input" value="' + u.email + '"></div>';
    html += '<div class="form-group"><label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644</label><input type="tel" name="phone" class="form-input" value="' + u.phone + '" dir="ltr"></div>';
    html += '<button type="submit" class="btn btn-primary">\u062d\u0641\u0638 \u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a</button>';
    html += '</form></div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</h3></div><div class="card-body">';
    html += '<form id="passwordForm" onsubmit="SharedPages.changePassword(event)">';
    html += '<div class="form-group"><label class="form-label">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062d\u0627\u0644\u064a\u0629</label><input type="password" name="currentPassword" class="form-input" placeholder="\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062d\u0627\u0644\u064a\u0629"></div>';
    html += '<div class="form-row"><div class="form-group"><label class="form-label">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629</label><input type="password" name="newPassword" class="form-input" placeholder="\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u062c\u062f\u064a\u062f\u0629"></div>';
    html += '<div class="form-group"><label class="form-label">\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</label><input type="password" name="confirmPassword" class="form-input" placeholder="\u0623\u0639\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"></div></div>';
    html += '<button type="submit" class="btn btn-primary">\u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</button>';
    html += '</form></div></div>';
    html += '</div></div>';
    return html;
  },

  updateProfile: function(e) {
    e.preventDefault();
    var form = e.target;
    var u = App.currentUser;
    u.firstName = form.firstName.value;
    u.lastName = form.lastName.value;
    u.email = form.email.value;
    u.phone = form.phone.value;
    Storage.setCurrentUser(u);
    App.renderApp();
    Toast.success('\u062a\u0645', '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a \u0628\u0646\u062c\u0627\u062d');
    Router.navigate('/profile');
  },

  changePassword: function(e) {
    e.preventDefault();
    var form = e.target;
    Validation.clearErrors(form);
    var errors = Validation.validate({
      currentPassword: form.currentPassword.value,
      newPassword: form.newPassword.value,
      confirmPassword: form.confirmPassword.value
    }, {
      currentPassword: ['required'],
      newPassword: ['required', 'password'],
      confirmPassword: ['required', ['match', form.newPassword.value]]
    });
    if (Object.keys(errors).length > 0) { Validation.showErrors(form, errors); return; }
    Toast.success('\u062a\u0645', '\u062a\u0645 \u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062c\u0627\u062d');
    form.reset();
  },

  renderSettings: function() {
    var u = App.currentUser;
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a</h1></div></div>';
    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-header"><h3 class="card-title">\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a</h3></div><div class="card-body">';

    var notifPrefs = { email: true, push: true, sms: false };
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-4) 0;border-bottom:1px solid var(--border-light)"><div><strong>\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</strong><p style="font-size:var(--font-xs);color:var(--text-muted);margin:0">\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0628\u0631\u064a\u062f\u064a\u0629</p></div><label class="switch"><input type="checkbox" ' + (notifPrefs.email ? 'checked' : '') + ' onchange="SharedPages.toggleNotif(this,\'email\')"><span class="switch-slider"></span></label></div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-4) 0;border-bottom:1px solid var(--border-light)"><div><strong>\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631</strong><p style="font-size:var(--font-xs);color:var(--text-muted);margin:0">\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0641\u0648\u0631\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u062c\u0647\u0627\u0632</p></div><label class="switch"><input type="checkbox" ' + (notifPrefs.push ? 'checked' : '') + ' onchange="SharedPages.toggleNotif(this,\'push\')"><span class="switch-slider"></span></label></div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-4) 0"><div><strong>\u0631\u0633\u0627\u0626\u0644 \u0642\u0633\u064a\u0637\u0631\u0629</strong><p style="font-size:var(--font-xs);color:var(--text-muted);margin:0">\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0639\u0644\u0649 \u0627\u0644\u062c\u0648\u0627\u0644</p></div><label class="switch"><input type="checkbox" ' + (notifPrefs.sms ? 'checked' : '') + ' onchange="SharedPages.toggleNotif(this,\'sms\')"><span class="switch-slider"></span></label></div>';
    html += '</div></div>';

    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-header"><h3 class="card-title">KYC - \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0647\u0648\u064a\u0629</h3></div><div class="card-body">';
    if (u.kycStatus === 'verified') {
      html += '<div style="text-align:center;padding:var(--space-8)"><div style="font-size:3rem;margin-bottom:var(--space-4)">&#10004;</div><h3 style="color:var(--success)">\u062d\u0633\u0627\u0628\u0643 \u0645\u0648\u062b\u0642</h3><p style="color:var(--text-secondary)">\u062a\u0645 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0647\u0648\u064a\u062a\u0643 \u0628\u0646\u062c\u0627\u062d</p></div>';
    } else if (u.kycStatus === 'pending') {
      html += '<div style="text-align:center;padding:var(--space-8)"><div style="font-size:3rem;margin-bottom:var(--space-4)">&#9203;</div><h3 style="color:var(--warning)">\u0642\u064a\u062f \u0645\u0631\u0627\u062c\u0639\u0629</h3><p style="color:var(--text-secondary)">\u0637\u0644\u0628\u0643 \u0642\u064a\u062f \u0645\u0631\u0627\u062c\u0639\u0629 \u0639\u0646\u062f \u0627\u0644\u0645\u0631\u0626\u064a</p></div>';
    } else {
      html += '<form id="kycForm" onsubmit="SharedPages.submitKYC(event)">';
      html += '<div class="form-group"><label class="form-label">\u0635\u0648\u0631\u0629 \u0627\u0644\u0647\u0648\u064a\u0629 \u0627\u0644\u0623\u0645\u0627\u0645\u0629</label><div class="file-upload" onclick="document.getElementById(\'kycFront\').click()"><input type="file" id="kycFront" accept="image/*" style="display:none"><div class="file-upload-icon">&#128196;</div><div class="file-upload-text">\u0627\u0636\u063a\u0637 \u0644\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629</div></div></div>';
      html += '<div class="form-group"><label class="form-label">\u0635\u0648\u0631\u0629 \u0627\u0644\u0647\u0648\u064a\u0629 \u0627\u0644\u062e\u0644\u0641\u064a\u0629</label><div class="file-upload" onclick="document.getElementById(\'kycBack\').click()"><input type="file" id="kycBack" accept="image/*" style="display:none"><div class="file-upload-icon">&#128196;</div><div class="file-upload-text">\u0627\u0636\u063a\u0637 \u0644\u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629</div></div></div>';
      html += '<div class="form-group"><label class="form-label">\u0635\u0648\u0631\u0629 \u0633\u064a\u0644\u0641\u064a</label><div class="file-upload" onclick="document.getElementById(\'kycSelfie\').click()"><input type="file" id="kycSelfie" accept="image/*" style="display:none"><div class="file-upload-icon">&#128247;</div><div class="file-upload-text">\u0627\u0644\u062a\u0642\u0637\u0639 \u0635\u0648\u0631\u0629 \u0633\u064a\u0644\u0641\u064a</div></div></div>';
      html += '<button type="submit" class="btn btn-primary btn-block">\u0625\u0631\u0633\u0627\u0644 \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629</button>';
      html += '</form>';
    }
    html += '</div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u062d\u0633\u0627\u0628\u064a \u0627\u0644\u062c\u0644\u0633\u0627\u062a \u0627\u0644\u0646\u0634\u0637\u0629</h3></div><div class="card-body">';
    html += '<div style="padding:var(--space-4);background:var(--bg-page);border-radius:var(--radius);margin-bottom:var(--space-4)"><div style="display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:var(--font-sm)">\u0627\u0644\u062c\u0644\u0633\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629</strong><p style="font-size:var(--font-xs);color:var(--text-muted);margin:0">Chrome on Windows - \u0646\u0634\u0637</p></div><span class="badge badge-success">\u0646\u0634\u0637</span></div></div>';
    html += '<button class="btn btn-danger btn-sm" onclick="App.logout()">\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u062c\u0645\u064a\u0639 \u0627\u0644\u062c\u0647\u0627\u0632</button>';
    html += '</div></div>';
    return html;
  },

  toggleNotif: function(el, type) {
    Toast.success('\u062a\u0645', '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a');
  },

  submitKYC: function(e) {
    e.preventDefault();
    MockData.kycRequests.push({ id: generateId(), userId: App.currentUser.id, status: 'pending', documents: {}, submittedAt: new Date().toISOString().split('T')[0], notes: '' });
    App.currentUser.kycStatus = 'pending';
    Storage.setCurrentUser(App.currentUser);
    Toast.success('\u062a\u0645', '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 KYC \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629');
    Router.navigate('/settings');
  },

  renderNotifications: function() {
    var notifs = getNotificationsByUser(App.currentUser.id);
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a</h1></div>';
    html += '<div class="page-header-right"><button class="btn btn-secondary btn-sm" onclick="SharedPages.markAllRead()">&#10004; \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0643\u0644 \u0643\u0645\u0642\u0631\u0648\u0621</button></div></div>';

    if (notifs.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128276;</div><h3>\u0644\u0627 \u062a\u0648\u062c\u062f \u0625\u0634\u0639\u0627\u0631\u0627\u062a</h3></div>';
      return html;
    }

    html += '<div class="card">';
    notifs.forEach(function(n) {
      var iconClass = n.type === 'booking' ? 'booking' : n.type === 'payment' ? 'payment' : n.type === 'message' ? 'message' : 'alert';
      var icons = { booking: '&#128197;', payment: '&#128179;', message: '&#128172;', alert: '&#9888;' };
      html += '<div class="notification-item ' + (n.isRead ? '' : 'unread') + '" onclick="SharedPages.markRead(\'' + n.id + '\')">';
      html += '<div class="notification-icon ' + iconClass + '">' + (icons[n.type] || '&#128276;') + '</div>';
      html += '<div style="flex:1"><strong style="font-size:var(--font-sm)">' + n.title + '</strong>';
      html += '<p style="font-size:var(--font-xs);color:var(--text-secondary);margin:2px 0 0">' + n.message + '</p>';
      html += '<span style="font-size:var(--font-xs);color:var(--text-muted)">' + formatDate(n.createdAt) + '</span></div>';
      if (!n.isRead) html += '<span class="badge badge-primary" style="font-size:10px">جديد</span>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  markRead: function(id) {
    var n = MockData.notifications.find(function(x) { return x.id === id; });
    if (n) { n.isRead = true; Router.handleRoute(); App.updateNotificationDot(); }
  },

  markAllRead: function() {
    MockData.notifications.forEach(function(n) { if (n.userId === App.currentUser.id) n.isRead = true; });
    Toast.success('\u062a\u0645', '\u062a\u0645 \u062a\u062d\u062f\u064a\u062f \u062c\u0645\u064a\u0639 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0643\u0645\u0642\u0631\u0648\u0621\u0629');
    Router.handleRoute();
    App.updateNotificationDot();
  },

  renderContracts: function() {
    var user = App.currentUser;
    var contracts = MockData.contracts.filter(function(c) { return c.ownerId === user.id || c.tenantId === user.id; });
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0639\u0642\u0648\u062f</h1></div></div>';
    if (contracts.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128196;</div><h3>\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0642\u0648\u062f</h3></div>';
      return html;
    }
    html += '<div class="grid-2">';
    contracts.forEach(function(c) {
      var prop = getPropertyById(c.propertyId);
      html += '<div class="card"><div class="card-body">';
      html += '<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:var(--space-3)"><h4>' + c.title + '</h4><span class="badge ' + getStatusBadgeClass(c.status) + '">' + getStatusLabel(c.status) + '</span></div>';
      html += '<p style="font-size:var(--font-sm);color:var(--text-secondary)">' + (prop ? prop.title : '') + '</p>';
      html += '<p style="font-size:var(--font-xs);color:var(--text-muted)">\u062a\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0621: ' + formatDate(c.createdAt) + '</p>';
      html += '<p style="font-size:var(--font-xs);color:var(--text-muted)">\u062a\u0645 \u0627\u0644\u062a\u0648\u0642\u064a\u0639: ' + c.signedBy.length + ' \u0637\u0631\u0641</p>';
      if (c.status === 'pending_signing') {
        html += '<button class="btn btn-primary btn-sm" style="margin-top:var(--space-3)" onclick="SharedPages.signContract(\'' + c.id + '\')">&#9998; \u062a\u0648\u0642\u064a\u0639 \u0627\u0644\u0639\u0642\u062f</button>';
      }
      html += '</div></div>';
    });
    html += '</div>';
    return html;
  },

  signContract: function(id) {
    Modal.confirm('\u062a\u0648\u0642\u064a\u0639 \u0627\u0644\u0639\u0642\u062f', '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062a\u0648\u0642\u064a\u0639 \u0647\u0630\u0627 \u0627\u0644\u0639\u0642\u062f\u061f', function() {
      var c = MockData.contracts.find(function(x) { return x.id === id; });
      if (c) {
        if (!c.signedBy.includes(App.currentUser.id)) c.signedBy.push(App.currentUser.id);
        if (c.signedBy.length >= 2) c.status = 'active';
        Toast.success('\u062a\u0645', '\u062a\u0645 \u062a\u0648\u0642\u064a\u0639 \u0627\u0644\u0639\u0642\u062f \u0628\u0646\u062c\u0627\u062d');
        Router.handleRoute();
      }
    });
  },

  renderPayments: function() {
    var user = App.currentUser;
    var payments = MockData.payments.filter(function(p) { return p.userId === user.id; });
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a</h1></div></div>';
    if (payments.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128179;</div><h3>\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u062f\u0641\u0648\u0639\u0627\u062a</h3></div>';
      return html;
    }
    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>\u0627\u0644\u0645\u0639\u0631\u0636</th><th>\u0627\u0644\u0645\u0628\u0644\u063a</th><th>\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639</th><th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u0627\u0644\u062a\u0627\u0631\u064a\u062e</th></tr></thead><tbody>';
    payments.forEach(function(p) {
      html += '<tr>';
      html += '<td class="font-mono">' + p.invoiceId + '</td>';
      html += '<td><strong>' + formatPrice(p.amount) + '</strong></td>';
      html += '<td>' + (p.paymentMethod === 'credit_card' ? '\u0628\u0637\u0627\u0642\u0629 \u0627\u0639\u062a\u0645\u0627\u062f' : '\u062a\u062d\u0648\u064a\u0644 \u0628\u0646\u0643\u064a') + '</td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span></td>';
      html += '<td>' + formatDate(p.createdAt) + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  },

  render404: function() {
    return '<div class="empty-state" style="min-height:60vh"><div class="empty-state-icon" style="font-size:4rem">&#128204;</div><h2>\u0627\u0644\u0635\u0641\u062d\u0629 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f\u0629</h2><p>\u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0630\u064a \u062a\u0628\u062d\u062b \u0639\u0646\u0647\u0627 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f\u0629.</p><button class="btn btn-primary" onclick="Router.navigate(\'/home\')">&#8594; \u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629</button></div>';
  }
};

function getRoleLabel(role) {
  var labels = { seeker: '\u0628\u0627\u062d\u062b', owner: '\u0645\u0627\u0644\u0643', broker: '\u0648\u0633\u064a\u0637', admin: '\u0645\u062f\u064a\u0631' };
  return labels[role] || role;
}
