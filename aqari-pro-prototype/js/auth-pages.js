var AuthPages = {
  renderLogin: function() {
    return '<div class="auth-layout">' +
      '<div class="auth-panel"><div class="auth-card">' +
        '<div class="logo"><div class="logo-icon">&#1593;</div><div class="logo-text">&#1593;&#1602;&#1575;&#1585;&#1610; &#1576;&#1585;&#1608;</div></div>' +
        '<h2 class="auth-title">\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644</h2>' +
        '<p class="auth-subtitle">\u0623\u062f\u062e\u0644 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0644\u0644\u0648\u0635\u0644 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628\u0643</p>' +
        '<form id="loginForm" onsubmit="AuthPages.handleLogin(event)">' +
          '<div class="form-group">' +
            '<label class="form-label">\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</label>' +
            '<input type="email" name="email" class="form-input" placeholder="example@email.com" value="seeker@test.com">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</label>' +
            '<input type="password" name="password" class="form-input" placeholder="\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" value="Password123!">' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6)">' +
            '<label class="form-check"><input type="checkbox" checked> <span>\u062a\u0630\u0643\u0631\u0646\u064a</span></label>' +
            '<a href="#/forgot-password" style="font-size:var(--font-sm)">\u0646\u0633\u064a\u062a \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061f</a>' +
          '</div>' +
          '<button type="submit" class="btn btn-primary btn-block btn-lg">\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644</button>' +
        '</form>' +
        '<div class="auth-divider">\u0623\u0648</div>' +
        '<div class="auth-footer">\u0644\u064a\u0633 \u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628\u061f <a href="#/register">\u0633\u062c\u0651\u0644 \u062d\u0633\u0627\u0628 \u062c\u062f\u064a\u062f</a></div>' +
        '<div style="margin-top:var(--space-6);padding:var(--space-4);background:var(--bg-page);border-radius:var(--radius);font-size:var(--font-xs);color:var(--text-secondary)">' +
          '<strong>\u062d\u0633\u0627\u0628\u0627\u062a \u062a\u062c\u0631\u064a\u0628\u064a\u0629:</strong><br>' +
          '\u0628\u0627\u062d\u062b: seeker@test.com<br>\u0645\u0627\u0644\u0643: owner@test.com<br>\u0648\u0633\u064a\u0637: broker@test.com<br>\u0645\u062f\u064a\u0631: admin@test.com<br>\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631: Password123!' +
        '</div>' +
      '</div></div>' +
      '<div class="auth-sidebar">' +
        '<div style="font-size:4rem;margin-bottom:var(--space-6)">&#127968;</div>' +
        '<h2>\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0643 \u0641\u064a &#1593\u1602\u1575\u1585\u1610 \u0628\u1585\u1608;</h2>' +
        '<p>\u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0623\u0648\u0644 \u0644\u0644\u0639\u0642\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629</p>' +
      '</div></div>';
  },

  renderRegister: function() {
    return '<div class="auth-layout">' +
      '<div class="auth-panel"><div class="auth-card">' +
        '<div class="logo"><div class="logo-icon">&#1593;</div><div class="logo-text">&#1593;&#1602;&#1575;&#1585;&#1610; &#1576;&#1585;&#1608;</div></div>' +
        '<h2 class="auth-title">\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628 \u062c\u062f\u064a\u062f</h2>' +
        '<p class="auth-subtitle">\u0623\u0646\u0634\u0626 \u062d\u0633\u0627\u0628\u0643 \u0644\u0628\u062f\u0621 \u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0623\u0641\u0636\u0644 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</p>' +
        '<form id="registerForm" onsubmit="AuthPages.handleRegister(event)">' +
          '<div class="form-row">' +
            '<div class="form-group"><label class="form-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644</label><input type="text" name="firstName" class="form-input" placeholder="\u0627\u0644\u0627\u0633\u0645"></div>' +
            '<div class="form-group"><label class="form-label">\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631</label><input type="text" name="lastName" class="form-input" placeholder="\u0627\u0644\u0644\u0642\u0628"></div>' +
          '</div>' +
          '<div class="form-group"><label class="form-label">\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</label><input type="email" name="email" class="form-input" placeholder="example@email.com"></div>' +
          '<div class="form-group"><label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644</label><input type="tel" name="phone" class="form-input" placeholder="+966XXXXXXXXX" dir="ltr"></div>' +
          '<div class="form-row">' +
            '<div class="form-group"><label class="form-label">\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</label><input type="password" name="password" class="form-input" placeholder="\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631\u0629"></div>' +
            '<div class="form-group"><label class="form-label">\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</label><input type="password" name="confirmPassword" class="form-input" placeholder="\u0623\u0639\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"></div>' +
          '</div>' +
          '<div class="form-group"><label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062d\u0633\u0627\u0628</label>' +
            '<select name="role" class="form-select"><option value="seeker">\u0628\u0627\u062d\u062b \u0639\u0646 \u0639\u0642\u0627\u0631</option><option value="owner">\u0645\u0627\u0644\u0643 \u0639\u0642\u0627\u0631</option><option value="broker">\u0648\u0633\u064a\u0637 \u0639\u0642\u0627\u0631\u0627\u062a</option></select>' +
          '</div>' +
          '<div class="form-group"><label class="form-check"><input type="checkbox" name="terms" required> <span>\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 <a href="#">\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645</a> \u0648<a href="#">\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629</a></span></label></div>' +
          '<button type="submit" class="btn btn-primary btn-block btn-lg">\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628</button>' +
        '</form>' +
        '<div class="auth-footer">\u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061f <a href="#/login">\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644</a></div>' +
      '</div></div>' +
      '<div class="auth-sidebar">' +
        '<div style="font-size:4rem;margin-bottom:var(--space-6)">&#128640;</div>' +
        '<h2>\u0628\u062f\u0623 \u0631\u0641\u0639 \u0645\u0633\u064a\u0631\u0643</h6>' +
        '<p>\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0641\u064a \u0627\u0644\u0645\u0646\u0635\u0629 \u0633\u0647\u0644 \u0644\u0643 \u0627\u0644\u0648\u0635\u0644 \u0625\u0644\u0649 \u0623\u0641\u0636\u0644 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0645\u0644\u0643\u0629</p>' +
      '</div></div>';
  },

  renderOTP: function() {
    return '<div class="auth-layout">' +
      '<div class="auth-panel"><div class="auth-card" style="text-align:center">' +
        '<div class="logo"><div class="logo-icon">&#1593;</div><div class="logo-text">&#1593;&#1602;&#1575;&#1585;&#1610; &#1576;&#1585;&#1608;</div></div>' +
        '<div style="font-size:3rem;margin-bottom:var(--space-4)">&#128274;</div>' +
        '<h2 class="auth-title">\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0647\u0648\u064a\u0629</h2>' +
        '<p class="auth-subtitle">\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u062a\u062d\u0642\u0642 \u0625\u0644\u0649 \u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644 \u0627\u0644\u0645\u0633\u062c\u0644</p>' +
        '<form id="otpForm" onsubmit="AuthPages.handleOTP(event)">' +
          '<div class="otp-inputs">' +
            '<input type="text" class="otp-input" maxlength="1" data-index="0" oninput="AuthPages.handleOTPInput(this)" onkeydown="AuthPages.handleOTPKeydown(event, this)">' +
            '<input type="text" class="otp-input" maxlength="1" data-index="1" oninput="AuthPages.handleOTPInput(this)" onkeydown="AuthPages.handleOTPKeydown(event, this)">' +
            '<input type="text" class="otp-input" maxlength="1" data-index="2" oninput="AuthPages.handleOTPInput(this)" onkeydown="AuthPages.handleOTPKeydown(event, this)">' +
            '<input type="text" class="otp-input" maxlength="1" data-index="3" oninput="AuthPages.handleOTPInput(this)" onkeydown="AuthPages.handleOTPKeydown(event, this)">' +
            '<input type="text" class="otp-input" maxlength="1" data-index="4" oninput="AuthPages.handleOTPInput(this)" onkeydown="AuthPages.handleOTPKeydown(event, this)">' +
            '<input type="text" class="otp-input" maxlength="1" data-index="5" oninput="AuthPages.handleOTPInput(this)" onkeydown="AuthPages.handleOTPKeydown(event, this)">' +
          '</div>' +
          '<button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top:var(--space-8)">\u062a\u0623\u0643\u064a\u062f</button>' +
        '</form>' +
        '<p style="margin-top:var(--space-6);font-size:var(--font-sm);color:var(--text-secondary)">\u0644\u0645 \u062a\u0635\u0644 \u0627\u0644\u0631\u0645\u0632\u061f <button class="btn btn-ghost" style="color:var(--primary);padding:0" onclick="AuthPages.resendOTP()">\u0625\u0639\u0627\u062f\u0629 \u0625\u0631\u0633\u0627\u0644</button></p>' +
      '</div></div>' +
      '<div class="auth-sidebar"><div style="font-size:4rem;margin-bottom:var(--space-6)">&#128274;</div><h2>\u0623\u0645\u0627\u0646 \u0645\u062a\u0643\u0627\u0645\u0644</h2><p>\u0646\u062d\u0646 \u0646\u0636\u0645\u0646 \u0644\u062d\u0645\u0627\u064a\u0629 \u062d\u0633\u0627\u0628\u0643</p></div></div>';
  },

  renderForgotPassword: function() {
    return '<div class="auth-layout">' +
      '<div class="auth-panel"><div class="auth-card" style="text-align:center">' +
        '<div class="logo"><div class="logo-icon">&#1593;</div><div class="logo-text">&#1593;&#1602;&#1575;&#1585;&#1610; &#1576;&#1585;&#1608;</div></div>' +
        '<div style="font-size:3rem;margin-bottom:var(--space-4)">&#128274;</div>' +
        '<h2 class="auth-title">\u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</h2>' +
        '<p class="auth-subtitle">\u0623\u062f\u062e\u0644 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0633\u0646\u0623\u0631\u0633\u0644 \u0644\u0643 \u0631\u0633\u0627\u0644\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631</p>' +
        '<form id="forgotForm" onsubmit="AuthPages.handleForgotPassword(event)">' +
          '<div class="form-group" style="text-align:right"><label class="form-label">\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</label><input type="email" name="email" class="form-input" placeholder="example@email.com"></div>' +
          '<button type="submit" class="btn btn-primary btn-block btn-lg">\u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646</button>' +
        '</form>' +
        '<div class="auth-footer"><a href="#/login">&#8594; \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644</a></div>' +
      '</div></div>' +
      '<div class="auth-sidebar"><div style="font-size:4rem;margin-bottom:var(--space-6)">&#128274;</div><h2>\u0644\u0627 \u062a\u063a\u0631\u0636</h2><p>\u0633\u0646\u0633\u0627\u0639\u062f\u0643 \u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0633\u0647\u0648\u0644\u0629</p></div></div>';
  },

  handleLogin: function(e) {
    e.preventDefault();
    var form = e.target;
    Validation.clearErrors(form);
    var errors = Validation.validate({
      email: form.email.value,
      password: form.password.value
    }, { email: ['required', 'email'], password: ['required'] });

    if (Object.keys(errors).length > 0) {
      Validation.showErrors(form, errors);
      return;
    }

    var user = MockData.users.find(function(u) { return u.email === form.email.value && u.password === form.password.value; });
    if (!user) {
      Toast.error('\u062e\u0637\u0623', '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062f\u062e\u0648\u0644 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d\u0629');
      return;
    }
    if (!user.isActive) {
      Toast.error('\u062d\u0633\u0627\u0628 \u0645\u0639\u0637\u0644', '\u062d\u0633\u0627\u0628\u0643 \u0645\u0639\u0637\u0644. \u062a\u0648\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u062f\u0627\u0631\u0629');
      return;
    }

    Storage.setCurrentUser(user);
    App.currentUser = user;
    App.renderApp();
    var homeRoutes = { seeker: '/home', owner: '/owner/dashboard', broker: '/broker/dashboard', admin: '/admin/dashboard' };
    Router.navigate(homeRoutes[user.role] || '/home');
    Toast.success('\u0645\u0631\u062d\u0628\u064b\u0627', '\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0646\u062c\u0627\u062d');
  },

  handleRegister: function(e) {
    e.preventDefault();
    var form = e.target;
    Validation.clearErrors(form);
    var errors = Validation.validate({
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      terms: form.terms.checked
    }, {
      firstName: ['required'], lastName: ['required'],
      email: ['required', 'email'], phone: ['required', 'phone'],
      password: ['required', 'password'],
      confirmPassword: ['required', ['match', form.password.value]],
      terms: ['required']
    });

    if (Object.keys(errors).length > 0) {
      Validation.showErrors(form, errors);
      return;
    }

    var newUser = {
      id: generateId(), email: form.email.value, phone: form.phone.value,
      password: form.password.value, firstName: form.firstName.value,
      lastName: form.lastName.value, role: form.role.value,
      kycStatus: 'unverified', isActive: true, avatar: null,
      createdAt: new Date().toISOString().split('T')[0]
    };
    MockData.users.push(newUser);
    Toast.success('\u062a\u0645', '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628\u0643 \u0628\u0646\u062c\u0627\u062d');
    Router.navigate('/login');
  },

  handleOTP: function(e) {
    e.preventDefault();
    var inputs = document.querySelectorAll('.otp-input');
    var otp = '';
    inputs.forEach(function(i) { otp += i.value; });
    if (otp.length < 6) {
      Toast.error('\u062e\u0637\u0623', '\u0623\u062f\u062e\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0643\u0627\u0645\u0644');
      return;
    }
    Toast.success('\u062a\u0645', '\u062a\u0645 \u0627\u0644\u062a\u062d\u0642\u0642 \u0628\u0646\u062c\u0627\u062d');
    var user = Storage.getCurrentUser() || MockData.users[0];
    if (!Storage.getCurrentUser()) {
      Storage.setCurrentUser(user);
    }
    Router.navigate('/home');
  },

  handleForgotPassword: function(e) {
    e.preventDefault();
    var form = e.target;
    Validation.clearErrors(form);
    var errors = Validation.validate({ email: form.email.value }, { email: ['required', 'email'] });
    if (Object.keys(errors).length > 0) { Validation.showErrors(form, errors); return; }
    Toast.success('\u062a\u0645', '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631');
    Router.navigate('/login');
  },

  handleOTPInput: function(input) {
    if (input.value.length === 1) {
      var next = input.nextElementSibling;
      if (next) next.focus();
    }
  },

  handleOTPKeydown: function(e, input) {
    if (e.key === 'Backspace' && !input.value) {
      var prev = input.previousElementSibling;
      if (prev) prev.focus();
    }
  },

  resendOTP: function() {
    Toast.info('\u062a\u0645', '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u062c\u062f\u064a\u062f');
  }
};
