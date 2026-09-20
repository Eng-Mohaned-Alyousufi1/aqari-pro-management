var AdminPages = {

  renderDashboard: function() {
    var users = MockData.users;
    var properties = MockData.properties;
    var bookings = MockData.bookings;
    var pendingKYC = MockData.kycRequests.filter(function(k) { return k.status === 'pending'; });
    var totalRevenue = MockData.payments.filter(function(p) { return p.status === 'completed'; }).reduce(function(s, p) { return s + p.amount; }, 0);
    var recentDisputes = MockData.disputes.filter(function(d) { return d.status === 'open'; });

    var html = '<div class="page-header"><div><h1 class="page-title">لوحة تحكم الإدارة</h1><p class="page-subtitle">مرحباً بك في لوحة تحكم إدارة عقاري برو</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-8)">';
    html += '<div class="stat-card"><div class="stat-icon blue">&#128101;</div><div class="stat-info"><div class="stat-value">' + users.length + '</div><div class="stat-label">إجمالي المستخدمين</div><div class="stat-change positive">&#9650; ' + users.filter(function(u) { return u.isActive; }).length + ' نشط</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#127968;</div><div class="stat-info"><div class="stat-value">' + properties.length + '</div><div class="stat-label">إجمالي العقارات</div><div class="stat-change positive">&#9650; ' + properties.filter(function(p) { return p.status === 'published'; }).length + ' منشور</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#128197;</div><div class="stat-info"><div class="stat-value">' + bookings.length + '</div><div class="stat-label">إجمالي الحجوزات</div><div class="stat-change positive">&#9650; ' + bookings.filter(function(b) { return b.status === 'confirmed'; }).length + ' مؤكد</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#128196;</div><div class="stat-info"><div class="stat-value">' + pendingKYC.length + '</div><div class="stat-label">طلبات KYC معلقة</div>' + (pendingKYC.length > 0 ? '<div class="stat-change negative">يحتاج مراجعة</div>' : '<div class="stat-change positive">لا توجد طلبات</div>') + '</div></div>';
    html += '</div>';

    html += '<div class="grid-2" style="margin-bottom:var(--space-8)">';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">إجمالي الإيرادات</h3></div><div class="card-body"><div style="font-size:var(--font-3xl);font-weight:700;color:var(--primary);margin-bottom:var(--space-3)">' + formatPrice(totalRevenue) + '</div><p style="font-size:var(--font-sm);color:var(--text-secondary)">' + MockData.payments.filter(function(p) { return p.status === 'completed'; }).length + ' دفعة مكتملة</p></div></div>';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">النزاعات المفتوحة</h3></div><div class="card-body"><div style="font-size:var(--font-3xl);font-weight:700;color:var(--error);margin-bottom:var(--space-3)">' + recentDisputes.length + '</div><p style="font-size:var(--font-sm);color:var(--text-secondary)">نزاع يحتاج حل</p>' + (recentDisputes.length > 0 ? '<button class="btn btn-sm btn-primary" style="margin-top:var(--space-2)" onclick="Router.navigate(\'/admin/disputes\')">مراجعة النزاعات</button>' : '') + '</div></div>';
    html += '</div>';

    html += '<div style="margin-bottom:var(--space-8)">';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">نمو المستخدمين</h3></div><div class="card-body">';
    html += '<div style="height:200px;display:flex;align-items:flex-end;gap:var(--space-4);padding-bottom:var(--space-4)">';
    var months = ['يناير', 'فبراير', 'مارس', 'أبريل'];
    var monthCounts = [2, 3, 2, 1];
    months.forEach(function(m, i) {
      var height = (monthCounts[i] / 3) * 100;
      html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:var(--space-2)">';
      html += '<div style="font-size:var(--font-xs);font-weight:600">' + monthCounts[i] + '</div>';
      html += '<div style="width:100%;height:' + height + '%;background:var(--primary);border-radius:var(--radius-sm) var(--radius-sm) 0 0;min-height:10px"></div>';
      html += '<div style="font-size:var(--font-xs);color:var(--text-secondary)">' + m + '</div>';
      html += '</div>';
    });
    html += '</div></div></div>';
    html += '</div>';

    html += '<div>';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">آخر النشاطات</h3></div><div class="card-body">';
    var activities = [];
    MockData.kycRequests.forEach(function(k) {
      var user = getUserById(k.userId);
      activities.push({ text: (user ? user.firstName + ' ' + user.lastName : 'مستخدم') + ' قدم طلب KYC - الحالة: ' + getStatusLabel(k.status), date: k.submittedAt, type: 'info' });
    });
    MockData.bookings.forEach(function(b) {
      var prop = getPropertyById(b.propertyId);
      activities.push({ text: 'حجز جديد على ' + (prop ? prop.title : 'عقار') + ' - الحالة: ' + getStatusLabel(b.status), date: b.createdAt, type: 'success' });
    });
    MockData.disputes.forEach(function(d) {
      activities.push({ text: 'نزاع: ' + d.reason + ' - الحالة: ' + getStatusLabel(d.status), date: d.createdAt, type: d.status === 'open' ? 'error' : 'success' });
    });
    activities.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });

    if (activities.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128240;</div><h3>لا توجد نشاطات</h3></div>';
    } else {
      activities.slice(0, 10).forEach(function(a) {
        html += '<div class="notification-item">';
        html += '<div class="notification-icon ' + a.type + '">&#128240;</div>';
        html += '<div style="flex:1"><div style="font-size:var(--font-sm)">' + a.text + '</div><div style="font-size:var(--font-xs);color:var(--text-muted);margin-top:2px">' + formatDate(a.date) + '</div></div>';
        html += '</div>';
      });
    }
    html += '</div></div></div>';

    return html;
  },

  renderUsers: function() {
    var users = MockData.users;
    var html = '<div class="page-header"><div><h1 class="page-title">إدارة المستخدمين</h1><p class="page-subtitle">' + users.length + ' مستخدم مسجل</p></div></div>';

    html += '<div class="filter-bar">';
    html += '<input type="text" class="form-input" id="adminUserSearch" placeholder="بحث بالاسم أو البريد الإلكتروني..." style="max-width:300px" onkeyup="AdminPages.filterUsers()">';
    html += '<select class="form-select" id="adminUserRoleFilter" style="max-width:160px" onchange="AdminPages.filterUsers()">';
    html += '<option value="">جميع الأدوار</option>';
    html += '<option value="seeker">باحث</option><option value="owner">مالك</option><option value="broker">وسيط</option><option value="admin">مدير</option>';
    html += '</select>';
    html += '<select class="form-select" id="adminUserStatusFilter" style="max-width:160px" onchange="AdminPages.filterUsers()">';
    html += '<option value="">جميع الحالات</option>';
    html += '<option value="active">نشط</option><option value="inactive">غير نشط</option>';
    html += '</select>';
    html += '<span class="filter-count" id="adminUserCount">' + users.length + ' مستخدم</span>';
    html += '</div>';

    html += '<div class="card"><div class="table-container"><table class="data-table" id="adminUsersTable"><thead><tr>';
    html += '<th>المستخدم</th><th>البريد الإلكتروني</th><th>رقم الجوال</th><th>الدور</th><th>KYC</th><th>الحالة</th><th>تاريخ التسجيل</th><th>إجراءات</th>';
    html += '</tr></thead><tbody id="adminUsersBody">';
    html += AdminPages.renderUsersRows(users);
    html += '</tbody></table></div></div>';

    return html;
  },

  renderUsersRows: function(users) {
    if (users.length === 0) {
      return '<tr><td colspan="8"><div class="empty-state" style="padding:var(--space-8)"><div class="empty-state-icon">&#128100;</div><h3>لا توجد نتائج</h3><p>لم يتم العثور على مستخدمين مطابقين</p></div></td></tr>';
    }
    var rows = '';
    var roleLabels = { seeker: 'باحث', owner: 'مالك', broker: 'وسيط', admin: 'مدير' };
    users.forEach(function(u) {
      rows += '<tr>';
      rows += '<td><div style="display:flex;align-items:center;gap:var(--space-3)"><div class="avatar avatar-sm">' + u.firstName.charAt(0) + '</div><div><strong style="font-size:var(--font-sm)">' + u.firstName + ' ' + u.lastName + '</strong><div style="font-size:var(--font-xs);color:var(--text-muted)">ID: ' + u.id + '</div></div></div></td>';
      rows += '<td style="font-size:var(--font-sm)">' + u.email + '</td>';
      rows += '<td style="font-size:var(--font-sm);direction:ltr;text-align:right">' + u.phone + '</td>';
      rows += '<td><span class="badge badge-primary">' + (roleLabels[u.role] || u.role) + '</span></td>';
      rows += '<td><span class="badge ' + getStatusBadgeClass(u.kycStatus) + '">' + getStatusLabel(u.kycStatus) + '</span></td>';
      rows += '<td><span class="badge ' + (u.isActive ? 'badge-success' : 'badge-neutral') + '">' + (u.isActive ? 'نشط' : 'غير نشط') + '</span></td>';
      rows += '<td style="font-size:var(--font-sm);color:var(--text-secondary)">' + formatDate(u.createdAt) + '</td>';
      rows += '<td><div class="btn-group">';
      rows += '<button class="btn btn-sm btn-ghost" onclick="AdminPages.viewUserDetails(\'' + u.id + '\')" title="تفاصيل">&#128065;</button>';
      rows += '<button class="btn btn-sm ' + (u.isActive ? 'btn-warning' : 'btn-success') + '" onclick="AdminPages.toggleUserStatus(\'' + u.id + '\')" title="' + (u.isActive ? 'تعطيل' : 'تفعيل') + '">' + (u.isActive ? '&#128682;' : '&#10004;') + '</button>';
      rows += '</div></td></tr>';
    });
    return rows;
  },

  filterUsers: function() {
    var search = document.getElementById('adminUserSearch').value.toLowerCase();
    var role = document.getElementById('adminUserRoleFilter').value;
    var status = document.getElementById('adminUserStatusFilter').value;
    var filtered = MockData.users.filter(function(u) {
      var matchSearch = !search || (u.firstName + ' ' + u.lastName).toLowerCase().includes(search) || u.email.toLowerCase().includes(search) || u.phone.includes(search);
      var matchRole = !role || u.role === role;
      var matchStatus = !status || (status === 'active' ? u.isActive : !u.isActive);
      return matchSearch && matchRole && matchStatus;
    });
    document.getElementById('adminUsersBody').innerHTML = AdminPages.renderUsersRows(filtered);
    document.getElementById('adminUserCount').textContent = filtered.length + ' مستخدم';
  },

  viewUserDetails: function(id) {
    var user = getUserById(id);
    if (!user) return;
    var roleLabels = { seeker: 'باحث', owner: 'مالك', broker: 'وسيط', admin: 'مدير' };
    var userProperties = MockData.properties.filter(function(p) { return p.ownerId === id; });
    var userBookings = MockData.bookings.filter(function(b) { return b.seekerId === id || b.ownerId === id; });

    var content = '<div style="text-align:center;margin-bottom:var(--space-6)">';
    content += '<div class="avatar avatar-lg" style="margin:0 auto var(--space-3)">' + user.firstName.charAt(0) + '</div>';
    content += '<h3>' + user.firstName + ' ' + user.lastName + '</h3>';
    content += '<span class="badge ' + getStatusBadgeClass(user.isActive ? 'active' : 'inactive') + '" style="margin-bottom:var(--space-2)">' + (user.isActive ? 'نشط' : 'غير نشط') + '</span>';
    content += '</div>';
    content += '<div class="detail-grid">';
    content += '<div class="detail-item"><span class="detail-label">البريد الإلكتروني</span><span class="detail-value">' + user.email + '</span></div>';
    content += '<div class="detail-item"><span class="detail-label">رقم الجوال</span><span class="detail-value">' + user.phone + '</span></div>';
    content += '<div class="detail-item"><span class="detail-label">الدور</span><span class="detail-value">' + (roleLabels[user.role] || user.role) + '</span></div>';
    content += '<div class="detail-item"><span class="detail-label">حالة KYC</span><span class="detail-value"><span class="badge ' + getStatusBadgeClass(user.kycStatus) + '">' + getStatusLabel(user.kycStatus) + '</span></span></div>';
    content += '<div class="detail-item"><span class="detail-label">تاريخ التسجيل</span><span class="detail-value">' + formatDate(user.createdAt) + '</span></div>';
    content += '<div class="detail-item"><span class="detail-label">عدد العقارات</span><span class="detail-value">' + userProperties.length + '</span></div>';
    content += '<div class="detail-item"><span class="detail-label">عدد الحجوزات</span><span class="detail-value">' + userBookings.length + '</span></div>';
    content += '</div>';

    Modal.show({ title: 'تفاصيل المستخدم', content: content, confirmText: 'إغلاق', onConfirm: function(close) { close(); } });
  },

  renderKYC: function() {
    var requests = MockData.kycRequests;
    var html = '<div class="page-header"><div><h1 class="page-title">مراجعة KYC</h1><p class="page-subtitle">' + requests.length + ' طلب إجمالي</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-6)">';
    html += '<div class="stat-card"><div class="stat-icon orange">&#128196;</div><div class="stat-info"><div class="stat-value">' + requests.filter(function(k) { return k.status === 'pending'; }).length + '</div><div class="stat-label">قيد المراجعة</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#10004;</div><div class="stat-info"><div class="stat-value">' + requests.filter(function(k) { return k.status === 'verified'; }).length + '</div><div class="stat-label">تم التوثيق</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#10006;</div><div class="stat-info"><div class="stat-value">' + requests.filter(function(k) { return k.status === 'rejected'; }).length + '</div><div class="stat-label">مرفوض</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon blue">&#128101;</div><div class="stat-info"><div class="stat-value">' + MockData.users.filter(function(u) { return u.kycStatus === 'verified'; }).length + '</div><div class="stat-label">المحققين</div></div></div>';
    html += '</div>';

    if (requests.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128196;</div><h3>لا توجد طلبات</h3><p>لم يتم تقديم أي طلبات توثيق هوية بعد</p></div>';
      return html;
    }

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>المستخدم</th><th>رقم الهوية</th><th>الصور المقدمة</th><th>تاريخ التقديم</th><th>الحالة</th><th>إجراءات</th>';
    html += '</tr></thead><tbody>';

    requests.forEach(function(k) {
      var user = getUserById(k.userId);
      html += '<tr>';
      html += '<td><div style="display:flex;align-items:center;gap:var(--space-3)"><div class="avatar avatar-sm">' + (user ? user.firstName.charAt(0) : '?') + '</div><div><strong style="font-size:var(--font-sm)">' + (user ? user.firstName + ' ' + user.lastName : 'مستخدم غير معروف') + '</strong><div style="font-size:var(--font-xs);color:var(--text-muted)">' + (user ? user.email : '') + '</div></div></div></td>';
      html += '<td style="font-size:var(--font-sm);font-family:monospace">' + k.id.toUpperCase() + '</td>';
      html += '<td><div style="display:flex;gap:var(--space-1);flex-wrap:wrap">';
      if (k.documents.frontId) html += '<span class="badge badge-info">الوجه الأمامي</span>';
      if (k.documents.backId) html += '<span class="badge badge-info">الوجه الخلفي</span>';
      if (k.documents.selfie) html += '<span class="badge badge-info">صورة شخصية</span>';
      html += '</div></td>';
      html += '<td style="font-size:var(--font-sm)">' + formatDate(k.submittedAt) + '</td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(k.status) + '">' + getStatusLabel(k.status) + '</span></td>';
      html += '<td><div class="btn-group">';
      if (k.status === 'pending') {
        html += '<button class="btn btn-sm btn-success" onclick="AdminPages.approveKYC(\'' + k.id + '\')">&#10004; موافقة</button>';
        html += '<button class="btn btn-sm btn-danger" onclick="AdminPages.rejectKYC(\'' + k.id + '\')">&#10006; رفض</button>';
      } else {
        html += '<button class="btn btn-sm btn-secondary" disabled>تمت المعالجة</button>';
      }
      html += '</div></td></tr>';
    });

    html += '</tbody></table></div></div>';
    return html;
  },

  approveKYC: function(id) {
    var request = MockData.kycRequests.find(function(k) { return k.id === id; });
    if (!request) return;
    var user = getUserById(request.userId);
    Modal.confirm('موافقة على KYC', 'هل أنت متأكد من الموافقة على طلب التحقق لـ ' + (user ? user.firstName + ' ' + user.lastName : 'هذا المستخدم') + '؟', function() {
      request.status = 'verified';
      if (user) user.kycStatus = 'verified';
      Toast.success('تم', 'تمت الموافقة على طلب KYC بنجاح');
      Router.handleRoute();
    });
  },

  rejectKYC: function(id) {
    var request = MockData.kycRequests.find(function(k) { return k.id === id; });
    if (!request) return;
    var user = getUserById(request.userId);
    Modal.show({
      title: 'رفض طلب KYC',
      content: '<p style="margin-bottom:var(--space-4)">هل أنت متأكد من رفض طلب التحقق لـ ' + (user ? user.firstName + ' ' + user.lastName : 'هذا المستخدم') + '؟</p>' +
        '<div class="form-group"><label class="form-label">سبب الرفض <span class="required">*</span></label>' +
        '<textarea id="rejectReason" class="form-textarea" rows="3" placeholder="أدخل سبب رفض الطلب..."></textarea></div>',
      confirmText: 'رفض الطلب',
      className: 'modal-danger',
      onConfirm: function(close) {
        var reason = document.getElementById('rejectReason').value.trim();
        if (!reason) {
          Toast.error('خطأ', 'يرجى إدخال سبب الرفض');
          return;
        }
        request.status = 'rejected';
        request.notes = reason;
        if (user) user.kycStatus = 'rejected';
        close();
        Toast.success('تم', 'تم رفض طلب KYC');
        Router.handleRoute();
      }
    });
  },

  renderContent: function() {
    var properties = MockData.properties;
    var html = '<div class="page-header"><div><h1 class="page-title">إدارة المحتوى</h1><p class="page-subtitle">' + properties.length + ' عقار مسجل</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-6)">';
    html += '<div class="stat-card"><div class="stat-icon green">&#128196;</div><div class="stat-info"><div class="stat-value">' + properties.filter(function(p) { return p.status === 'published'; }).length + '</div><div class="stat-label">منشور</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#128197;</div><div class="stat-info"><div class="stat-value">' + properties.filter(function(p) { return p.status === 'pending'; }).length + '</div><div class="stat-label">قيد المراجعة</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#10006;</div><div class="stat-info"><div class="stat-value">' + properties.filter(function(p) { return p.status === 'rejected'; }).length + '</div><div class="stat-label">مرفوض</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon blue">&#9998;</div><div class="stat-info"><div class="stat-value">' + properties.filter(function(p) { return p.status === 'draft'; }).length + '</div><div class="stat-label">مسودة</div></div></div>';
    html += '</div>';

    html += '<div class="filter-bar">';
    html += '<select class="form-select" id="adminContentFilter" style="max-width:200px" onchange="AdminPages.filterProperties()">';
    html += '<option value="">جميع الحالات</option>';
    html += '<option value="published">منشور</option><option value="pending">قيد المراجعة</option><option value="rejected">مرفوض</option><option value="draft">مسودة</option>';
    html += '</select>';
    html += '<span class="filter-count" id="adminContentCount">' + properties.length + ' عقار</span>';
    html += '</div>';

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>العقار</th><th>المالك</th><th>النوع</th><th>السعر</th><th>المدينة</th><th>الحالة</th><th>إجراءات</th>';
    html += '</tr></thead><tbody id="adminContentBody">';
    html += AdminPages.renderPropertyRows(properties);
    html += '</tbody></table></div></div>';

    return html;
  },

  renderPropertyRows: function(properties) {
    if (properties.length === 0) {
      return '<tr><td colspan="7"><div class="empty-state" style="padding:var(--space-8)"><div class="empty-state-icon">&#127968;</div><h3>لا توجد نتائج</h3><p>لم يتم العثور على عقارات مطابقة</p></div></td></tr>';
    }
    var rows = '';
    var propertyTypeLabels = { villa: 'فيلا', apartment: 'شقة', studio: 'استوديو', duplex: 'دوبلكس', office: 'مكتب', land: 'أرض', penthouse: 'بنتهاوس' };
    properties.forEach(function(p) {
      var owner = getUserById(p.ownerId);
      rows += '<tr>';
      rows += '<td><div style="display:flex;align-items:center;gap:var(--space-3)">';
      rows += '<div style="width:48px;height:48px;border-radius:var(--radius);overflow:hidden;flex-shrink:0;background:var(--bg-page)">';
      rows += p.images && p.images[0] ? '<img src="' + p.images[0] + '" style="width:100%;height:100%;object-fit:cover" alt="">' : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem">&#127968;</div>';
      rows += '</div>';
      rows += '<div><strong style="font-size:var(--font-sm)">' + p.title + '</strong><div style="font-size:var(--font-xs);color:var(--text-muted)">' + p.district + ', ' + p.city + '</div></div>';
      rows += '</div></td>';
      rows += '<td style="font-size:var(--font-sm)">' + (owner ? owner.firstName + ' ' + owner.lastName : '-') + '</td>';
      rows += '<td><span class="badge badge-neutral">' + (propertyTypeLabels[p.propertyType] || p.propertyType) + '</span></td>';
      rows += '<td style="font-size:var(--font-sm);font-weight:600;color:var(--primary)">' + formatPrice(p.price) + '</td>';
      rows += '<td style="font-size:var(--font-sm)">' + p.city + '</td>';
      rows += '<td><span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span></td>';
      rows += '<td><div class="btn-group">';
      if (p.status === 'pending') {
        rows += '<button class="btn btn-sm btn-success" onclick="AdminPages.approveProperty(\'' + p.id + '\')" title="اعتماد">&#10004;</button>';
        rows += '<button class="btn btn-sm btn-danger" onclick="AdminPages.rejectProperty(\'' + p.id + '\')" title="رفض">&#10006;</button>';
      } else if (p.status === 'published') {
        rows += '<button class="btn btn-sm btn-warning" onclick="AdminPages.suspendProperty(\'' + p.id + '\')" title="تعليق">&#9888;</button>';
      }
      rows += '<button class="btn btn-sm btn-ghost" onclick="Router.navigate(\'/property/' + p.id + '\')" title="عرض">&#128065;</button>';
      rows += '</div></td></tr>';
    });
    return rows;
  },

  filterProperties: function() {
    var status = document.getElementById('adminContentFilter').value;
    var filtered = MockData.properties.filter(function(p) {
      return !status || p.status === status;
    });
    document.getElementById('adminContentBody').innerHTML = AdminPages.renderPropertyRows(filtered);
    document.getElementById('adminContentCount').textContent = filtered.length + ' عقار';
  },

  approveProperty: function(id) {
    var prop = getPropertyById(id);
    if (!prop) return;
    Modal.confirm('اعتماد العقار', 'هل أنت متأكد من اعتماد عقار "' + prop.title + '"؟', function() {
      prop.status = 'published';
      Toast.success('تم', 'تم اعتماد العقار بنجاح');
      Router.handleRoute();
    });
  },

  rejectProperty: function(id) {
    var prop = getPropertyById(id);
    if (!prop) return;
    Modal.show({
      title: 'رفض العقار',
      content: '<p style="margin-bottom:var(--space-4)">هل أنت متأكد من رفض عقار "' + prop.title + '"؟</p>' +
        '<div class="form-group"><label class="form-label">سبب الرفض <span class="required">*</span></label>' +
        '<textarea id="rejectPropReason" class="form-textarea" rows="3" placeholder="أدخل سبب رفض العقار..."></textarea></div>',
      confirmText: 'رفض العقار',
      onConfirm: function(close) {
        var reason = document.getElementById('rejectPropReason').value.trim();
        if (!reason) {
          Toast.error('خطأ', 'يرجى إدخال سبب الرفض');
          return;
        }
        prop.status = 'rejected';
        close();
        Toast.success('تم', 'تم رفض العقار');
        Router.handleRoute();
      }
    });
  },

  suspendProperty: function(id) {
    var prop = getPropertyById(id);
    if (!prop) return;
    Modal.confirm('تعليق العقار', 'هل أنت متأكد من تعليق عقار "' + prop.title + '"؟', function() {
      prop.status = 'suspended';
      Toast.success('تم', 'تم تعليق العقار');
      Router.handleRoute();
    });
  },

  renderDisputes: function() {
    var disputes = MockData.disputes;
    var html = '<div class="page-header"><div><h1 class="page-title">حل النزاعات</h1><p class="page-subtitle">' + disputes.length + ' نزاع مسجل</p></div></div>';

    html += '<div class="grid-3" style="margin-bottom:var(--space-6)">';
    html += '<div class="stat-card"><div class="stat-icon red">&#9878;</div><div class="stat-info"><div class="stat-value">' + disputes.filter(function(d) { return d.status === 'open'; }).length + '</div><div class="stat-label">نزاعات مفتوحة</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#10004;</div><div class="stat-info"><div class="stat-value">' + disputes.filter(function(d) { return d.status === 'resolved'; }).length + '</div><div class="stat-label">نزاعات محلولة</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon blue">&#128179;</div><div class="stat-info"><div class="stat-value">' + MockData.bookings.filter(function(b) { return b.status === 'cancelled'; }).length + '</div><div class="stat-label">حجوزات ملغاة</div></div></div>';
    html += '</div>';

    if (disputes.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#9878;</div><h3>لا توجد نزاعات</h3><p>لم يتم تسجيل أي نزاعات حتى الآن</p></div>';
      return html;
    }

    disputes.forEach(function(d) {
      var complainant = getUserById(d.complainantId);
      var respondent = getUserById(d.respondentId);
      var booking = MockData.bookings.find(function(b) { return b.id === d.bookingId; });
      var prop = booking ? getPropertyById(booking.propertyId) : null;

      html += '<div class="card" style="margin-bottom:var(--space-4)">';
      html += '<div class="card-header"><div style="display:flex;align-items:center;gap:var(--space-3)">';
      html += '<span class="badge ' + getStatusBadgeClass(d.status) + '">' + getStatusLabel(d.status) + '</span>';
      html += '<h3 class="card-title" style="font-size:var(--font-base)">' + d.reason + '</h3>';
      html += '</div></div>';
      html += '<div class="card-body">';
      html += '<div class="detail-grid" style="margin-bottom:var(--space-4)">';
      html += '<div class="detail-item"><span class="detail-label">المشتكي</span><span class="detail-value">' + (complainant ? complainant.firstName + ' ' + complainant.lastName : '-') + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">المشتكى منه</span><span class="detail-value">' + (respondent ? respondent.firstName + ' ' + respondent.lastName : '-') + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">العقار</span><span class="detail-value">' + (prop ? prop.title : '-') + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">الحجز</span><span class="detail-value" style="font-family:monospace">' + d.bookingId + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">تاريخ النزاع</span><span class="detail-value">' + formatDate(d.createdAt) + '</span></div>';
      if (d.resolvedAt) {
        html += '<div class="detail-item"><span class="detail-label">تاريخ الحل</span><span class="detail-value">' + formatDate(d.resolvedAt) + '</span></div>';
      }
      html += '</div>';
      if (d.resolution) {
        html += '<div style="padding:var(--space-3);background:var(--success-50);border-radius:var(--radius);font-size:var(--font-sm);margin-bottom:var(--space-4)"><strong>الحل:</strong> ' + d.resolution + '</div>';
      }
      if (d.status === 'open') {
        html += '<button class="btn btn-primary" onclick="AdminPages.resolveDispute(\'' + d.id + '\')">&#10004; حل النزاع</button>';
      }
      html += '</div></div>';
    });

    return html;
  },

  resolveDispute: function(id) {
    var dispute = MockData.disputes.find(function(d) { return d.id === id; });
    if (!dispute) return;

    Modal.show({
      title: 'حل النزاع',
      content: '<p style="margin-bottom:var(--space-4)">' + dispute.reason + '</p>' +
        '<div class="form-group"><label class="form-label">الحل <span class="required">*</span></label>' +
        '<textarea id="disputeResolution" class="form-textarea" rows="4" placeholder="اكتب حل النزاع هنا..."></textarea></div>' +
        '<div style="padding:var(--space-3);background:var(--info-50);border-radius:var(--radius);font-size:var(--font-xs);color:var(--info)">&#8505; سيتم إخطار الطرفين بالحل المقدم</div>',
      confirmText: 'تأكيد الحل',
      onConfirm: function(close) {
        var resolution = document.getElementById('disputeResolution').value.trim();
        if (!resolution) {
          Toast.error('خطأ', 'يرجى كتابة حل النزاع');
          return;
        }
        dispute.status = 'resolved';
        dispute.resolution = resolution;
        dispute.resolvedAt = new Date().toISOString().split('T')[0];
        close();
        Toast.success('تم', 'تم حل النزاع بنجاح');
        Router.handleRoute();
      }
    });
  },

  renderReports: function() {
    var users = MockData.users;
    var properties = MockData.properties;
    var bookings = MockData.bookings;
    var payments = MockData.payments;
    var totalRevenue = payments.filter(function(p) { return p.status === 'completed'; }).reduce(function(s, p) { return s + p.amount; }, 0);
    var totalViews = properties.reduce(function(s, p) { return s + p.views; }, 0);
    var totalFavorites = properties.reduce(function(s, p) { return s + p.favorites; }, 0);

    var html = '<div class="page-header"><div><h1 class="page-title">التقارير</h1><p class="page-subtitle">نظرة عامة على أداء المنصة</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-8)">';
    html += '<div class="stat-card"><div class="stat-icon blue">&#128179;</div><div class="stat-info"><div class="stat-value">' + formatPrice(totalRevenue) + '</div><div class="stat-label">إجمالي الإيرادات</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#128065;</div><div class="stat-info"><div class="stat-value">' + new Intl.NumberFormat('ar-SA').format(totalViews) + '</div><div class="stat-label">إجمالي المشاهدات</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#10084;</div><div class="stat-info"><div class="stat-value">' + totalFavorites + '</div><div class="stat-label">إجمالي المفضلات</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#128172;</div><div class="stat-info"><div class="stat-value">' + MockData.inquiries.length + '</div><div class="stat-label">إجمالي الاستفسارات</div></div></div>';
    html += '</div>';

    html += '<div class="grid-2" style="margin-bottom:var(--space-8)">';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">الإيرادات الشهرية</h3></div><div class="card-body">';
    html += '<div style="height:200px;display:flex;align-items:flex-end;gap:var(--space-3)">';
    var revMonths = ['يناير', 'فبراير', 'مارس'];
    var revAmounts = [125000, 10000, 7000];
    var maxRev = Math.max.apply(null, revAmounts);
    revMonths.forEach(function(m, i) {
      var h = (revAmounts[i] / maxRev) * 100;
      html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:var(--space-2)">';
      html += '<div style="font-size:var(--font-xs);font-weight:600">' + formatPrice(revAmounts[i]) + '</div>';
      html += '<div style="width:100%;height:' + h + '%;background:var(--primary);border-radius:var(--radius-sm) var(--radius-sm) 0 0;min-height:10px"></div>';
      html += '<div style="font-size:var(--font-xs);color:var(--text-secondary)">' + m + '</div>';
      html += '</div>';
    });
    html += '</div></div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">العقارات حسب النوع</h3></div><div class="card-body">';
    var typeLabels = { villa: 'فيلا', apartment: 'شقة', studio: 'استوديو', duplex: 'دوبلكس', office: 'مكتب', land: 'أرض', penthouse: 'بنتهاوس' };
    var typeCounts = {};
    properties.forEach(function(p) { typeCounts[p.propertyType] = (typeCounts[p.propertyType] || 0) + 1; });
    var maxTypeCount = Math.max.apply(null, Object.values(typeCounts));
    Object.keys(typeCounts).forEach(function(type) {
      var count = typeCounts[type];
      var pct = (count / maxTypeCount) * 100;
      html += '<div style="margin-bottom:var(--space-3)">';
      html += '<div style="display:flex;justify-content:space-between;margin-bottom:var(--space-1)"><span style="font-size:var(--font-sm)">' + (typeLabels[type] || type) + '</span><span style="font-size:var(--font-sm);font-weight:600">' + count + '</span></div>';
      html += '<div class="progress-bar"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>';
      html += '</div>';
    });
    html += '</div></div>';
    html += '</div>';

    html += '<div style="margin-bottom:var(--space-8)">';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">العقارات الأعلى أداءً</h3></div><div class="card-body">';
    var topProperties = properties.slice().sort(function(a, b) { return b.views - a.views; }).slice(0, 5);
    if (topProperties.length > 0) {
      html += '<table class="data-table"><thead><tr><th>العقار</th><th>المشاهدات</th><th>المفضلات</th><th>الاستفسارات</th><th>السعر</th></tr></thead><tbody>';
      topProperties.forEach(function(p) {
        html += '<tr>';
        html += '<td><strong style="font-size:var(--font-sm)">' + p.title + '</strong><div style="font-size:var(--font-xs);color:var(--text-muted)">' + p.district + '</div></td>';
        html += '<td style="font-size:var(--font-sm)">' + new Intl.NumberFormat('ar-SA').format(p.views) + '</td>';
        html += '<td style="font-size:var(--font-sm)">' + p.favorites + '</td>';
        html += '<td style="font-size:var(--font-sm)">' + p.inquiries + '</td>';
        html += '<td style="font-size:var(--font-sm);font-weight:600;color:var(--primary)">' + formatPrice(p.price) + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table>';
    } else {
      html += '<div class="empty-state"><h3>لا توجد بيانات</h3></div>';
    }
    html += '</div></div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">ملخص الأداء</h3></div><div class="card-body">';
    html += '<div class="detail-grid">';
    html += '<div class="detail-item"><span class="detail-label">معدل التحويل</span><span class="detail-value">' + (bookings.length > 0 ? ((bookings.filter(function(b) { return b.status === 'confirmed'; }).length / bookings.length) * 100).toFixed(1) + '%' : '0%') + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">متوسط سعر العقار</span><span class="detail-value">' + formatPrice(Math.round(properties.reduce(function(s, p) { return s + p.price; }, 0) / properties.length)) + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">نسبة الإشغال</span><span class="detail-value">' + ((bookings.filter(function(b) { return b.status === 'confirmed'; }).length / properties.filter(function(p) { return p.listingType === 'rent'; }).length) * 100).toFixed(1) + '%</span></div>';
    html += '<div class="detail-item"><span class="detail-label">معدل رضا المستخدمين</span><span class="detail-value">4.2/5</span></div>';
    html += '</div>';
    html += '</div></div>';

    return html;
  },

  renderSettings: function() {
    var settings = Storage.get('adminSettings') || {
      siteName: 'عقاري برو',
      maintenanceMode: false,
      registrationEnabled: true,
      kycRequired: true,
      maxUploadSize: 10,
      supportEmail: 'support@aqari-pro.com',
      platformFee: 5
    };

    var html = '<div class="page-header"><div><h1 class="page-title">إعدادات النظام</h1><p class="page-subtitle">إعدادات إدارة المنصة</p></div></div>';

    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6)">';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">&#127968; الإعدادات العامة</h3></div><div class="card-body">';
    html += '<form id="adminSettingsForm" onsubmit="AdminPages.saveSettings(event)">';
    html += '<div class="form-group"><label class="form-label">اسم الموقع</label><input type="text" class="form-input" id="settingSiteName" value="' + settings.siteName + '"></div>';
    html += '<div class="form-group"><label class="form-label">البريد الإلكتروني للدعم</label><input type="email" class="form-input" id="settingSupportEmail" value="' + settings.supportEmail + '"></div>';
    html += '<div class="form-group"><label class="form-label">نسبة الرسوم (%)</label><input type="number" class="form-input" id="settingPlatformFee" value="' + settings.platformFee + '" min="0" max="100"></div>';
    html += '<div class="form-group"><label class="form-label">حجم الرفع الأقصى (ميجابايت)</label><input type="number" class="form-input" id="settingMaxUpload" value="' + settings.maxUploadSize + '" min="1" max="50"></div>';
    html += '<button type="submit" class="btn btn-primary">حفظ الإعدادات</button>';
    html += '</form></div></div>';

    html += '<div><div class="card" style="margin-bottom:var(--space-6)"><div class="card-header"><h3 class="card-title">&#9888; الصيانة</h3></div><div class="card-body">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4)">';
    html += '<div><div style="font-weight:500;font-size:var(--font-sm)">وضع الصيانة</div><div style="font-size:var(--font-xs);color:var(--text-secondary)">تعطيل الوصول للمستخدمين أثناء الصيانة</div></div>';
    html += '<label class="switch"><input type="checkbox" id="settingMaintenance" ' + (settings.maintenanceMode ? 'checked' : '') + ' onchange="AdminPages.toggleMaintenance(this)"><span class="switch-slider"></span></label>';
    html += '</div>';
    html += '<div style="padding:var(--space-3);background:var(--warning-50);border-radius:var(--radius);font-size:var(--font-xs);color:var(--warning)">&#9888; عند تفعيل وضع الصيانة، لن يتمكن المستخدمون من الوصول للمنصة</div>';
    html += '</div></div>';

    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-header"><h3 class="card-title">&#128101; التسجيل</h3></div><div class="card-body">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4)">';
    html += '<div><div style="font-weight:500;font-size:var(--font-sm)">تفعيل التسجيل</div><div style="font-size:var(--font-xs);color:var(--text-secondary)">السماح بالتسجيل الجديد</div></div>';
    html += '<label class="switch"><input type="checkbox" id="settingRegistration" ' + (settings.registrationEnabled ? 'checked' : '') + ' onchange="AdminPages.toggleRegistration(this)"><span class="switch-slider"></span></label>';
    html += '</div>';
    html += '<div style="display:flex;align-items:center;justify-content:space-between">';
    html += '<div><div style="font-weight:500;font-size:var(--font-sm)">إلزامي KYC</div><div style="font-size:var(--font-xs);color:var(--text-secondary)">يتطلب التحقق من الهوية قبل استخدام المنصة</div></div>';
    html += '<label class="switch"><input type="checkbox" id="settingKYCRequired" ' + (settings.kycRequired ? 'checked' : '') + ' onchange="AdminPages.toggleKYCRequired(this)"><span class="switch-slider"></span></label>';
    html += '</div>';
    html += '</div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">&#128736; إجراءات النظام</h3></div><div class="card-body">';
    html += '<button class="btn btn-secondary btn-block" style="margin-bottom:var(--space-3)" onclick="AdminPages.clearCache()">&#128465; مسح الكاش</button>';
    html += '<button class="btn btn-secondary btn-block" style="margin-bottom:var(--space-3)" onclick="AdminPages.exportData()">&#128230; تصدير البيانات</button>';
    html += '<button class="btn btn-danger btn-block" onclick="AdminPages.resetSystem()">&#9888; إعادة تعيين النظام</button>';
    html += '</div></div>';
    html += '</div></div>';

    return html;
  },

  saveSettings: function(e) {
    e.preventDefault();
    var settings = {
      siteName: document.getElementById('settingSiteName').value,
      maintenanceMode: document.getElementById('settingMaintenance').checked,
      registrationEnabled: document.getElementById('settingRegistration').checked,
      kycRequired: document.getElementById('settingKYCRequired').checked,
      maxUploadSize: parseInt(document.getElementById('settingMaxUpload').value),
      supportEmail: document.getElementById('settingSupportEmail').value,
      platformFee: parseInt(document.getElementById('settingPlatformFee').value)
    };
    Storage.set('adminSettings', settings);
    Toast.success('تم', 'تم حفظ الإعدادات بنجاح');
  },

  toggleMaintenance: function(checkbox) {
    var settings = Storage.get('adminSettings') || {};
    settings.maintenanceMode = checkbox.checked;
    Storage.set('adminSettings', settings);
    Toast.info('تم', checkbox.checked ? 'تم تفعيل وضع الصيانة' : 'تم إيقاف وضع الصيانة');
  },

  toggleRegistration: function(checkbox) {
    var settings = Storage.get('adminSettings') || {};
    settings.registrationEnabled = checkbox.checked;
    Storage.set('adminSettings', settings);
    Toast.info('تم', checkbox.checked ? 'تم تفعيل التسجيل' : 'تم تعطيل التسجيل');
  },

  toggleKYCRequired: function(checkbox) {
    var settings = Storage.get('adminSettings') || {};
    settings.kycRequired = checkbox.checked;
    Storage.set('adminSettings', settings);
    Toast.info('تم', checkbox.checked ? 'تم تفعيل KYC الإلزامي' : 'تم إيقاف KYC الإلزامي');
  },

  clearCache: function() {
    Modal.confirm('مسح الكاش', 'هل أنت متأكد من مسح الكاش؟ لن يتم حذف البيانات الحقيقية.', function() {
      Toast.success('تم', 'تم مسح الكاش بنجاح');
    });
  },

  exportData: function() {
    var data = JSON.stringify(MockData, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'aqari-pro-data-export-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    Toast.success('تم', 'تم تصدير البيانات بنجاح');
  },

  resetSystem: function() {
    Modal.confirm('إعادة تعيين النظام', 'تحذير: هذا الإجراء سيحذف جميع البيانات المخصصة. هل أنت متأكد؟', function() {
      Storage.clear();
      Toast.info('تم', 'تم إعادة تعيين النظام. يُرجى تحديث الصفحة.');
      setTimeout(function() { window.location.reload(); }, 1500);
    });
  },

  toggleUserStatus: function(id) {
    var user = getUserById(id);
    if (!user) return;
    var action = user.isActive ? 'تعطيل' : 'تفعيل';
    Modal.confirm(action + ' المستخدم', 'هل أنت متأكد من ' + action + ' حساب ' + user.firstName + ' ' + user.lastName + '؟', function() {
      user.isActive = !user.isActive;
      Toast.success('تم', 'تم ' + action + ' الحساب بنجاح');
      Router.handleRoute();
    });
  }
};
