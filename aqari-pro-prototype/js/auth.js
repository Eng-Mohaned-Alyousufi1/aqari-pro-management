const Auth = {
  login(email, password) {
    const user = MockData.users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
    if (!user.isActive) return { success: false, message: 'الحساب معطّل. يرجى التواصل مع الإدارة' };

    const session = { ...user, loginAt: new Date().toISOString() };
    Storage.setCurrentUser(session);
    return { success: true, user: session };
  },

  register(data) {
    const exists = MockData.users.find(u => u.email === data.email || u.phone === data.phone);
    if (exists) return { success: false, message: 'البريد الإلكتروني أو رقم الجوال مسجل مسبقاً' };

    const newUser = {
      id: generateId(),
      email: data.email,
      phone: data.phone,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'seeker',
      kycStatus: 'unverified',
      isActive: true,
      avatar: null,
      createdAt: new Date().toISOString().split('T')[0]
    };

    MockData.users.push(newUser);
    return { success: true, user: newUser, otp: '123456' };
  },

  verifyOTP(otp) {
    return otp === '123456';
  },

  logout() {
    Storage.logout();
    Router.navigate('login');
  },

  getCurrentUser() {
    return Storage.getCurrentUser();
  },

  isLoggedIn() {
    return !!Storage.getCurrentUser();
  },

  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  },

  canAccess(roles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    return roles.includes(user.role);
  },

  updateProfile(data) {
    const user = this.getCurrentUser();
    if (!user) return false;

    Object.assign(user, data);
    Storage.setCurrentUser(user);

    const idx = MockData.users.findIndex(u => u.id === user.id);
    if (idx !== -1) Object.assign(MockData.users[idx], data);

    return true;
  },

  changePassword(currentPass, newPass) {
    const user = this.getCurrentUser();
    if (!user) return { success: false, message: 'غير مصرح' };
    if (user.password !== currentPass) return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };

    user.password = newPass;
    Storage.setCurrentUser(user);
    const idx = MockData.users.findIndex(u => u.id === user.id);
    if (idx !== -1) MockData.users[idx].password = newPass;

    return { success: true };
  }
};
