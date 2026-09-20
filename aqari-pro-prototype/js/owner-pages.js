var OwnerPages = {
  currentStep: 1,
  totalSteps: 3,

  renderDashboard: function () {
    var user = App.currentUser;
    var properties = getPropertiesByOwner(user.id);
    var totalViews = properties.reduce(function (s, p) { return s + p.views; }, 0);
    var ownerBookings = MockData.bookings.filter(function (b) { return b.ownerId === user.id; });
    var totalFavorites = properties.reduce(function (s, p) { return s + p.favorites; }, 0);
    var recentBookings = ownerBookings.slice(0, 5);

    var html = '<div class="page-header"><div><h1 class="page-title">لوحة التحكم</h1><p class="page-subtitle">مرحباً بك ' + user.firstName + '</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-8)">';
    html += '<div class="stat-card"><div class="stat-icon blue">&#127968;</div><div class="stat-info"><div class="stat-value">' + properties.length + '</div><div class="stat-label">إجمالي العقارات</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#128065;</div><div class="stat-info"><div class="stat-value">' + totalViews.toLocaleString('ar-SA') + '</div><div class="stat-label">إجمالي المشاهدات</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#128197;</div><div class="stat-info"><div class="stat-value">' + ownerBookings.length + '</div><div class="stat-label">الحجوزات</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#10084;</div><div class="stat-info"><div class="stat-value">' + totalFavorites + '</div><div class="stat-label">المفضلة</div></div></div>';
    html += '</div>';

    html += '<div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--space-6);margin-bottom:var(--space-6)">';

    html += '<div class="card"><div class="card-header" style="display:flex;justify-content:space-between;align-items:center"><h3 class="card-title">آخر الإعلانات</h3><a href="#/owner/listings" class="btn btn-ghost btn-sm">عرض الكل &#8592;</a></div><div class="table-container">';
    if (properties.length === 0) {
      html += '<div class="empty-state" style="padding:var(--space-8)"><div class="empty-state-icon">&#127968;</div><h3>لم تُضف أي عقارات بعد</h3><p>ابدأ بإضافة عقارك الأول</p><button class="btn btn-primary" onclick="Router.navigate(\'/owner/add-property\')">&#10133; إضافة عقار</button></div>';
    } else {
      html += '<table class="data-table"><thead><tr><th>العقار</th><th>النوع</th><th>الحالة</th><th>المشاهدات</th></tr></thead><tbody>';
      properties.slice(0, 5).forEach(function (p) {
        html += '<tr>';
        html += '<td><strong>' + p.title + '</strong><div style="font-size:var(--font-xs);color:var(--text-secondary)">' + p.district + '، ' + p.city + '</div></td>';
        html += '<td><span class="badge badge-neutral">' + getPropertyTypeLabel(p.propertyType) + '</span></td>';
        html += '<td><span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span></td>';
        html += '<td>' + p.views.toLocaleString('ar-SA') + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table>';
    }
    html += '</div></div>';

    html += '<div><div class="card" style="margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">إجراءات سريعة</h3></div><div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-3)">';
    html += '<button class="btn btn-primary btn-block" onclick="Router.navigate(\'/owner/add-property\')">&#10133; إضافة عقار جديد</button>';
    html += '<button class="btn btn-secondary btn-block" onclick="Router.navigate(\'/owner/listings\')">&#127968; إدارة الإعلانات</button>';
    html += '<button class="btn btn-secondary btn-block" onclick="Router.navigate(\'/owner/bookings\')">&#128197; إدارة الحجوزات</button>';
    html += '<button class="btn btn-secondary btn-block" onclick="Router.navigate(\'/owner/inquiries\')">&#128172; الاستفسارات</button>';
    html += '</div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">آخر الحجوزات</h3></div><div class="card-body">';
    if (recentBookings.length === 0) {
      html += '<div class="empty-state" style="padding:var(--space-6)"><div class="empty-state-icon">&#128197;</div><h3>لا توجد حجوزات</h3></div>';
    } else {
      recentBookings.forEach(function (b) {
        var prop = getPropertyById(b.propertyId);
        var seeker = getUserById(b.seekerId);
        html += '<div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--border-light)">';
        html += '<div class="avatar avatar-sm">' + (seeker ? seeker.firstName.charAt(0) : '?') + '</div>';
        html += '<div style="flex:1;min-width:0"><div style="font-size:var(--font-sm);font-weight:600">' + (seeker ? seeker.firstName + ' ' + seeker.lastName : '') + '</div>';
        html += '<div style="font-size:var(--font-xs);color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (prop ? prop.title : '-') + '</div></div>';
        html += '<span class="badge ' + getStatusBadgeClass(b.status) + '">' + getStatusLabel(b.status) + '</span>';
        html += '</div>';
      });
    }
    html += '</div></div>';

    html += '</div></div>';

    return html;
  },

  renderListings: function () {
    var user = App.currentUser;
    var properties = getPropertiesByOwner(user.id);

    var html = '<div class="page-header"><div><h1 class="page-title">إعلاناتي</h1><p class="page-subtitle">' + properties.length + ' عقار مسجل</p></div>';
    html += '<button class="btn btn-primary" onclick="Router.navigate(\'/owner/add-property\')">&#10133; إضافة عقار</button></div>';

    if (properties.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#127968;</div><h3>لم تُضف أي عقارات بعد</h3><p>ابدأ بإضافة عقارك الأول لإدارة إعلاناتك</p><button class="btn btn-primary" onclick="Router.navigate(\'/owner/add-property\')">&#10133; إضافة عقار</button></div>';
      return html;
    }

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>العقار</th><th>النوع</th><th>قائمة</th><th>السعر</th><th>الحالة</th><th>المشاهدات</th><th>المفضلة</th><th>إجراءات</th>';
    html += '</tr></thead><tbody>';

    properties.forEach(function (p) {
      var img = p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/60x40';
      html += '<tr>';
      html += '<td><div style="display:flex;align-items:center;gap:var(--space-3)">';
      html += '<img src="' + img + '" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:var(--radius-sm)">';
      html += '<div><strong>' + p.title + '</strong><div style="font-size:var(--font-xs);color:var(--text-secondary)">' + p.district + '، ' + p.city + '</div></div>';
      html += '</div></td>';
      html += '<td><span class="badge badge-neutral">' + getPropertyTypeLabel(p.propertyType) + '</span></td>';
      html += '<td><span class="badge ' + (p.listingType === 'sale' ? 'badge-primary' : 'badge-success') + '">' + getListingTypeLabel(p.listingType) + '</span></td>';
      html += '<td><strong>' + formatPrice(p.price) + '</strong></td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span></td>';
      html += '<td>' + p.views.toLocaleString('ar-SA') + '</td>';
      html += '<td>' + p.favorites + '</td>';
      html += '<td><div class="btn-group">';
      html += '<button class="btn btn-sm btn-secondary" onclick="Router.navigate(\'/owner/edit-property/' + p.id + '\')" title="تعديل">&#9998; تعديل</button>';
      html += '<button class="btn btn-sm btn-ghost" onclick="Router.navigate(\'/property/' + p.id + '\')" title="عرض">&#128065;</button>';
      html += '<button class="btn btn-sm btn-danger" onclick="OwnerPages.deleteProperty(\'' + p.id + '\')" title="حذف">&#128465;</button>';
      html += '</div></td></tr>';
    });

    html += '</tbody></table></div></div>';
    return html;
  },

  renderAddProperty: function () {
    this.currentStep = 1;
    var html = '<div class="page-header"><div><h1 class="page-title">إضافة عقار جديد</h1><p class="page-subtitle">أدخل بيانات العقار خطوة بخطوة</p></div></div>';

    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-body">';
    html += '<div class="step-indicator">';
    for (var i = 1; i <= this.totalSteps; i++) {
      html += '<div class="step' + (i <= this.currentStep ? ' active' : '') + '" id="stepIndicator' + i + '">';
      html += '<div class="step-number">' + i + '</div>';
      var stepLabels = ['المعلومات الأساسية', 'التفاصيل', 'الصور والمرافق'];
      html += '<div class="step-label">' + stepLabels[i - 1] + '</div>';
      html += '</div>';
      if (i < this.totalSteps) html += '<div class="step-line"></div>';
    }
    html += '</div>';
    html += '</div></div>';

    html += '<form id="addPropertyForm" onsubmit="return false">';

    html += '<div class="card form-step" id="formStep1" style="margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">&#128221; الخطوة الأولى: المعلومات الأساسية</h3></div><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">عنوان العقار *</label><input type="text" name="title" class="form-input" placeholder="مثال: فيلا فاخرة حي النرجس" required></div>';
    html += '<div class="form-group"><label class="form-label">الوصف *</label><textarea name="description" class="form-input" rows="4" placeholder="أدخل وصفاً تفصيلياً للعقار" required></textarea></div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">نوع العقار *</label><select name="propertyType" class="form-select" required><option value="">اختر النوع</option><option value="villa">فيلا</option><option value="apartment">شقة</option><option value="studio">استوديو</option><option value="duplex">دوبلكس</option><option value="office">مكتب</option><option value="land">أرض</option><option value="penthouse">بنتهاوس</option></select></div>';
    html += '<div class="form-group"><label class="form-label">نوع القائمة *</label><select name="listingType" class="form-select" required><option value="">اختر النوع</option><option value="sale">للبيع</option><option value="rent">للإيجار</option></select></div>';
    html += '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">السعر (ريال) *</label><input type="number" name="price" class="form-input" placeholder="0" min="0" required></div>';
    html += '<div class="form-group"><label class="form-label">المساحة (م²) *</label><input type="number" name="areaSqm" class="form-input" placeholder="0" min="0" required></div>';
    html += '</div>';
    html += '</div></div>';

    html += '<div class="card form-step" id="formStep2" style="display:none;margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">&#128736; الخطوة الثانية: التفاصيل</h3></div><div class="card-body">';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">غرف النوم</label><input type="number" name="bedrooms" class="form-input" placeholder="0" min="0"></div>';
    html += '<div class="form-group"><label class="form-label">الحمامات</label><input type="number" name="bathrooms" class="form-input" placeholder="0" min="0"></div>';
    html += '<div class="form-group"><label class="form-label">مواقف السيارات</label><input type="number" name="parking" class="form-input" placeholder="0" min="0"></div>';
    html += '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">المدينة *</label><input type="text" name="city" class="form-input" placeholder="مثال: الرياض" required></div>';
    html += '<div class="form-group"><label class="form-label">الحي *</label><input type="text" name="district" class="form-input" placeholder="مثال: النرجس" required></div>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">المنطقة</label><input type="text" name="region" class="form-input" placeholder="مثال: منطقة الرياض"></div>';
    html += '</div></div>';

    html += '<div class="card form-step" id="formStep3" style="display:none;margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">&#128247; الخطوة الثالثة: الصور والمرافق</h3></div><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">روابط الصور (رابط في كل سطر)</label><textarea name="images" class="form-input" rows="3" placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"></textarea></div>';
    html += '<div class="form-group"><label class="form-label">المرافق</label>';
    var amenitiesList = ['مسبح', 'حديقة', 'غرفة خادمة', 'نادي صحي', 'مكيف مركزي', 'مطبخ مجهز', 'أمن 24/7', 'بلكونة', 'موقف سيارات', 'إنترنت', 'غرفة سينما', 'صالة رياضية'];
    html += '<div style="display:flex;flex-wrap:wrap;gap:var(--space-3)">';
    amenitiesList.forEach(function (a) {
      html += '<label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--font-sm);cursor:pointer"><input type="checkbox" name="amenities" value="' + a + '"> ' + a + '</label>';
    });
    html += '</div></div>';
    html += '<div class="form-group"><label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer"><input type="checkbox" name="isFeatured"> تمييز العقار في الصفحة الرئيسية</label></div>';
    html += '</div></div>';

    html += '<div style="display:flex;justify-content:space-between;align-items:center">';
    html += '<button type="button" class="btn btn-secondary" id="prevStepBtn" onclick="OwnerPages.prevStep()" style="display:none">&#8594; السابق</button>';
    html += '<button type="button" class="btn btn-primary" id="nextStepBtn" onclick="OwnerPages.nextStep()">التالي &#8592;</button>';
    html += '</div>';

    html += '</form>';

    html += '<style>';
    html += '.step-indicator{display:flex;align-items:center;justify-content:center;gap:0}';
    html += '.step{display:flex;flex-direction:column;align-items:center;gap:var(--space-2);min-width:120px}';
    html += '.step-number{width:40px;height:40px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:var(--font-sm);color:var(--text-secondary);transition:all 0.3s}';
    html += '.step.active .step-number{background:var(--primary);border-color:var(--primary);color:white}';
    html += '.step.completed .step-number{background:var(--success);border-color:var(--success);color:white}';
    html += '.step-label{font-size:var(--font-xs);color:var(--text-secondary);text-align:center}';
    html += '.step.active .step-label{color:var(--primary);font-weight:600}';
    html += '.step-line{flex:1;height:2px;background:var(--border);min-width:40px;margin-bottom:var(--space-6)}';
    html += '.form-step{transition:opacity 0.3s}';
    html += '</style>';

    return html;
  },

  nextStep: function () {
    var form = document.getElementById('addPropertyForm');
    if (!form) return;

    var isValid = OwnerPages.validateCurrentStep();
    if (!isValid) return;

    if (OwnerPages.currentStep < OwnerPages.totalSteps) {
      document.getElementById('formStep' + OwnerPages.currentStep).style.display = 'none';
      OwnerPages.currentStep++;
      document.getElementById('formStep' + OwnerPages.currentStep).style.display = '';

      for (var i = 1; i <= OwnerPages.totalSteps; i++) {
        var indicator = document.getElementById('stepIndicator' + i);
        if (indicator) {
          indicator.classList.remove('active', 'completed');
          if (i < OwnerPages.currentStep) indicator.classList.add('completed');
          else if (i === OwnerPages.currentStep) indicator.classList.add('active');
        }
      }

      document.getElementById('prevStepBtn').style.display = OwnerPages.currentStep > 1 ? '' : 'none';
      document.getElementById('nextStepBtn').textContent = OwnerPages.currentStep === OwnerPages.totalSteps ? 'إضافة العقار &#10004;' : 'التالي &#8592;';
    } else {
      OwnerPages.handleAddProperty();
    }
  },

  prevStep: function () {
    if (OwnerPages.currentStep > 1) {
      document.getElementById('formStep' + OwnerPages.currentStep).style.display = 'none';
      OwnerPages.currentStep--;
      document.getElementById('formStep' + OwnerPages.currentStep).style.display = '';

      for (var i = 1; i <= OwnerPages.totalSteps; i++) {
        var indicator = document.getElementById('stepIndicator' + i);
        if (indicator) {
          indicator.classList.remove('active', 'completed');
          if (i < OwnerPages.currentStep) indicator.classList.add('completed');
          else if (i === OwnerPages.currentStep) indicator.classList.add('active');
        }
      }

      document.getElementById('prevStepBtn').style.display = OwnerPages.currentStep > 1 ? '' : 'none';
      document.getElementById('nextStepBtn').textContent = 'التالي &#8592;';
    }
  },

  validateCurrentStep: function () {
    var form = document.getElementById('addPropertyForm');
    var step = OwnerPages.currentStep;

    if (step === 1) {
      var title = form.querySelector('[name="title"]').value.trim();
      var desc = form.querySelector('[name="description"]').value.trim();
      var type = form.querySelector('[name="propertyType"]').value;
      var listing = form.querySelector('[name="listingType"]').value;
      var price = form.querySelector('[name="price"]').value;
      var area = form.querySelector('[name="areaSqm"]').value;

      var errors = {};
      if (!title) errors.title = Validation.messages.required;
      if (!desc) errors.description = Validation.messages.required;
      if (!type) errors.propertyType = Validation.messages.required;
      if (!listing) errors.listingType = Validation.messages.required;
      if (!price || parseFloat(price) <= 0) errors.price = 'يجب إدخال سعر صحيح';
      if (!area || parseFloat(area) <= 0) errors.areaSqm = 'يجب إدخال مساحة صحيحة';

      Validation.clearErrors(form);
      if (Object.keys(errors).length > 0) {
        Validation.showErrors(form, errors);
        return false;
      }
    }

    if (step === 2) {
      var city = form.querySelector('[name="city"]').value.trim();
      var district = form.querySelector('[name="district"]').value.trim();
      Validation.clearErrors(form);
      var errors2 = {};
      if (!city) errors2.city = Validation.messages.required;
      if (!district) errors2.district = Validation.messages.required;
      if (Object.keys(errors2).length > 0) {
        Validation.showErrors(form, errors2);
        return false;
      }
    }

    return true;
  },

  handleAddProperty: function () {
    var form = document.getElementById('addPropertyForm');
    if (!form) return;

    var user = App.currentUser;
    var imagesText = form.querySelector('[name="images"]').value.trim();
    var images = imagesText ? imagesText.split('\n').filter(function (u) { return u.trim(); }) : [];
    var checkedAmenities = [];
    form.querySelectorAll('[name="amenities"]:checked').forEach(function (cb) {
      checkedAmenities.push(cb.value);
    });

    var newProperty = {
      id: generateId(),
      ownerId: user.id,
      title: form.querySelector('[name="title"]').value.trim(),
      description: form.querySelector('[name="description"]').value.trim(),
      propertyType: form.querySelector('[name="propertyType"]').value,
      listingType: form.querySelector('[name="listingType"]').value,
      status: 'pending',
      price: parseFloat(form.querySelector('[name="price"]').value),
      areaSqm: parseFloat(form.querySelector('[name="areaSqm"]').value),
      bedrooms: parseInt(form.querySelector('[name="bedrooms"]').value) || 0,
      bathrooms: parseInt(form.querySelector('[name="bathrooms"]').value) || 0,
      parking: parseInt(form.querySelector('[name="parking"]').value) || 0,
      city: form.querySelector('[name="city"]').value.trim(),
      district: form.querySelector('[name="district"]').value.trim(),
      region: form.querySelector('[name="region"]').value.trim() || '',
      latitude: 0,
      longitude: 0,
      amenities: checkedAmenities,
      isFeatured: form.querySelector('[name="isFeatured"]').checked,
      views: 0,
      favorites: 0,
      inquiries: 0,
      createdAt: new Date().toISOString().split('T')[0],
      images: images
    };

    MockData.properties.push(newProperty);
    Toast.success('تم', 'تم إضافة العقار بنجاح وفي انتظار المراجعة');
    Router.navigate('/owner/listings');
  },

  renderEditProperty: function (params) {
    var p = getPropertyById(params.id);
    if (!p) return '<div class="empty-state"><div class="empty-state-icon">&#128533;</div><h3>العقار غير موجود</h3><p>لم يتم العثور على العقار المطلوب</p><button class="btn btn-primary" onclick="Router.navigate(\'/owner/listings\')">العودة للإعلانات</button></div>';

    var html = '<div class="breadcrumb"><a href="#/owner/listings">إعلاناتي</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">تعديل: ' + p.title + '</span></div>';
    html += '<div class="page-header"><div><h1 class="page-title">تعديل العقار</h1><p class="page-subtitle">' + p.title + '</p></div></div>';

    html += '<form id="editPropertyForm" onsubmit="return false">';
    html += '<div class="card" style="margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">&#128221; المعلومات الأساسية</h3></div><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">عنوان العقار *</label><input type="text" name="title" class="form-input" value="' + p.title + '" required></div>';
    html += '<div class="form-group"><label class="form-label">الوصف *</label><textarea name="description" class="form-input" rows="4" required>' + p.description + '</textarea></div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">نوع العقار *</label><select name="propertyType" class="form-select" required>';
    var types = [{ v: 'villa', l: 'فيلا' }, { v: 'apartment', l: 'شقة' }, { v: 'studio', l: 'استوديو' }, { v: 'duplex', l: 'دوبلكس' }, { v: 'office', l: 'مكتب' }, { v: 'land', l: 'أرض' }, { v: 'penthouse', l: 'بنتهاوس' }];
    types.forEach(function (t) { html += '<option value="' + t.v + '"' + (p.propertyType === t.v ? ' selected' : '') + '>' + t.l + '</option>'; });
    html += '</select></div>';
    html += '<div class="form-group"><label class="form-label">نوع القائمة *</label><select name="listingType" class="form-select" required>';
    html += '<option value="sale"' + (p.listingType === 'sale' ? ' selected' : '') + '>للبيع</option>';
    html += '<option value="rent"' + (p.listingType === 'rent' ? ' selected' : '') + '>للإيجار</option>';
    html += '</select></div>';
    html += '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">السعر (ريال) *</label><input type="number" name="price" class="form-input" value="' + p.price + '" min="0" required></div>';
    html += '<div class="form-group"><label class="form-label">المساحة (م²) *</label><input type="number" name="areaSqm" class="form-input" value="' + p.areaSqm + '" min="0" required></div>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">الحالة</label><select name="status" class="form-select">';
    var statuses = [{ v: 'draft', l: 'مسودة' }, { v: 'published', l: 'منشور' }, { v: 'pending', l: 'قيد المراجعة' }];
    statuses.forEach(function (s) { html += '<option value="' + s.v + '"' + (p.status === s.v ? ' selected' : '') + '>' + s.l + '</option>'; });
    html += '</select></div>';
    html += '</div></div>';

    html += '<div class="card" style="margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">&#128736; التفاصيل</h3></div><div class="card-body">';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">غرف النوم</label><input type="number" name="bedrooms" class="form-input" value="' + p.bedrooms + '" min="0"></div>';
    html += '<div class="form-group"><label class="form-label">الحمامات</label><input type="number" name="bathrooms" class="form-input" value="' + p.bathrooms + '" min="0"></div>';
    html += '<div class="form-group"><label class="form-label">مواقف السيارات</label><input type="number" name="parking" class="form-input" value="' + p.parking + '" min="0"></div>';
    html += '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">';
    html += '<div class="form-group"><label class="form-label">المدينة *</label><input type="text" name="city" class="form-input" value="' + p.city + '" required></div>';
    html += '<div class="form-group"><label class="form-label">الحي *</label><input type="text" name="district" class="form-input" value="' + p.district + '" required></div>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">المنطقة</label><input type="text" name="region" class="form-input" value="' + (p.region || '') + '"></div>';
    html += '</div></div>';

    html += '<div class="card" style="margin-bottom:var(--space-4)"><div class="card-header"><h3 class="card-title">&#128247; الصور والمرافق</h3></div><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">روابط الصور (رابط في كل سطر)</label><textarea name="images" class="form-input" rows="3">' + (p.images ? p.images.join('\n') : '') + '</textarea></div>';
    html += '<div class="form-group"><label class="form-label">المرافق</label>';
    var allAmenities = ['مسبح', 'حديقة', 'غرفة خادمة', 'نادي صحي', 'مكيف مركزي', 'مطبخ مجهز', 'أمن 24/7', 'بلكونة', 'موقف سيارات', 'إنترنت', 'غرفة سينما', 'صالة رياضية'];
    html += '<div style="display:flex;flex-wrap:wrap;gap:var(--space-3)">';
    allAmenities.forEach(function (a) {
      var checked = p.amenities.indexOf(a) >= 0 ? ' checked' : '';
      html += '<label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--font-sm);cursor:pointer"><input type="checkbox" name="amenities" value="' + a + '"' + checked + '> ' + a + '</label>';
    });
    html += '</div></div>';
    html += '<div class="form-group"><label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer"><input type="checkbox" name="isFeatured"' + (p.isFeatured ? ' checked' : '') + '> تمييز العقار في الصفحة الرئيسية</label></div>';
    html += '</div></div>';

    html += '<div style="display:flex;gap:var(--space-3)">';
    html += '<button type="button" class="btn btn-primary" onclick="OwnerPages.handleEditProperty(\'' + p.id + '\')">&#10004; حفظ التعديلات</button>';
    html += '<button type="button" class="btn btn-secondary" onclick="Router.navigate(\'/owner/listings\')">&#10006; إلغاء</button>';
    html += '</div>';

    html += '</form>';
    return html;
  },

  handleEditProperty: function (id) {
    var form = document.getElementById('editPropertyForm');
    if (!form) return;

    var title = form.querySelector('[name="title"]').value.trim();
    var desc = form.querySelector('[name="description"]').value.trim();
    var city = form.querySelector('[name="city"]').value.trim();
    var district = form.querySelector('[name="district"]').value.trim();

    Validation.clearErrors(form);
    var errors = {};
    if (!title) errors.title = Validation.messages.required;
    if (!desc) errors.description = Validation.messages.required;
    if (!city) errors.city = Validation.messages.required;
    if (!district) errors.district = Validation.messages.required;

    if (Object.keys(errors).length > 0) {
      Validation.showErrors(form, errors);
      return;
    }

    var p = getPropertyById(id);
    if (!p) return;

    var imagesText = form.querySelector('[name="images"]').value.trim();
    var images = imagesText ? imagesText.split('\n').filter(function (u) { return u.trim(); }) : [];
    var checkedAmenities = [];
    form.querySelectorAll('[name="amenities"]:checked').forEach(function (cb) {
      checkedAmenities.push(cb.value);
    });

    p.title = title;
    p.description = desc;
    p.propertyType = form.querySelector('[name="propertyType"]').value;
    p.listingType = form.querySelector('[name="listingType"]').value;
    p.price = parseFloat(form.querySelector('[name="price"]').value);
    p.areaSqm = parseFloat(form.querySelector('[name="areaSqm"]').value);
    p.bedrooms = parseInt(form.querySelector('[name="bedrooms"]').value) || 0;
    p.bathrooms = parseInt(form.querySelector('[name="bathrooms"]').value) || 0;
    p.parking = parseInt(form.querySelector('[name="parking"]').value) || 0;
    p.city = city;
    p.district = district;
    p.region = form.querySelector('[name="region"]').value.trim();
    p.status = form.querySelector('[name="status"]').value;
    p.amenities = checkedAmenities;
    p.isFeatured = form.querySelector('[name="isFeatured"]').checked;
    p.images = images;

    Toast.success('تم', 'تم حفظ التعديلات بنجاح');
    Router.navigate('/owner/listings');
  },

  deleteProperty: function (id) {
    var p = getPropertyById(id);
    if (!p) return;

    Modal.confirm('حذف العقار', 'هل أنت متأكد من حذف "' + p.title + '"؟ لا يمكن التراجع عن هذا الإجراء.', function () {
      var idx = MockData.properties.findIndex(function (x) { return x.id === id; });
      if (idx >= 0) {
        MockData.properties.splice(idx, 1);
        Toast.success('تم', 'تم حذف العقار بنجاح');
        Router.handleRoute();
      }
    });
  },

  renderBookings: function () {
    var user = App.currentUser;
    var bookings = MockData.bookings.filter(function (b) { return b.ownerId === user.id; });

    var html = '<div class="page-header"><div><h1 class="page-title">إدارة الحجوزات</h1><p class="page-subtitle">' + bookings.length + ' حجز</p></div></div>';

    if (bookings.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128197;</div><h3>لا توجد حجوزات بعد</h3><p>ستظهر هنا الحجوزات التي يتقدم بها الباحثون عن عقاراتك</p></div>';
      return html;
    }

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>الباحث</th><th>العقار</th><th>المبلغ</th><th>من</th><th>إلى</th><th>الحالة</th><th>التاريخ</th><th>إجراءات</th>';
    html += '</tr></thead><tbody>';

    bookings.forEach(function (b) {
      var prop = getPropertyById(b.propertyId);
      var seeker = getUserById(b.seekerId);
      html += '<tr>';
      html += '<td><div style="display:flex;align-items:center;gap:var(--space-2)"><div class="avatar avatar-sm">' + (seeker ? seeker.firstName.charAt(0) : '?') + '</div><div><strong>' + (seeker ? seeker.firstName + ' ' + seeker.lastName : '-') + '</strong></div></div></td>';
      html += '<td>' + (prop ? prop.title : '-') + '</td>';
      html += '<td><strong>' + formatPrice(b.bookingAmount) + '</strong></td>';
      html += '<td>' + formatDate(b.checkInDate) + '</td>';
      html += '<td>' + formatDate(b.checkOutDate) + '</td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(b.status) + '">' + getStatusLabel(b.status) + '</span></td>';
      html += '<td>' + formatDate(b.createdAt) + '</td>';
      html += '<td><div class="btn-group">';
      if (b.status === 'pending') {
        html += '<button class="btn btn-sm btn-success" onclick="OwnerPages.confirmBooking(\'' + b.id + '\')">&#10004; تأكيد</button>';
        html += '<button class="btn btn-sm btn-danger" onclick="OwnerPages.rejectBooking(\'' + b.id + '\')">&#10006; رفض</button>';
      } else {
        html += '<button class="btn btn-sm btn-secondary" onclick="Router.navigate(\'/booking/' + b.id + '\')">&#128065; التفاصيل</button>';
      }
      html += '</div></td></tr>';
    });

    html += '</tbody></table></div></div>';
    return html;
  },

  confirmBooking: function (id) {
    Modal.confirm('تأكيد الحجز', 'هل أنت متأكد من تأكيد هذا الحجز؟', function () {
      var b = MockData.bookings.find(function (x) { return x.id === id; });
      if (b) {
        b.status = 'confirmed';
        Toast.success('تم', 'تم تأكيد الحجز بنجاح');
        Router.handleRoute();
      }
    });
  },

  rejectBooking: function (id) {
    Modal.confirm('رفض الحجز', 'هل أنت متأكد من رفض هذا الحجز؟', function () {
      var b = MockData.bookings.find(function (x) { return x.id === id; });
      if (b) {
        b.status = 'cancelled';
        Toast.success('تم', 'تم رفض الحجز');
        Router.handleRoute();
      }
    });
  },

  renderContracts: function () {
    var user = App.currentUser;
    var contracts = MockData.contracts.filter(function (c) { return c.ownerId === user.id; });

    var html = '<div class="page-header"><div><h1 class="page-title">العقود</h1><p class="page-subtitle">' + contracts.length + ' عقد</p></div></div>';

    if (contracts.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128196;</div><h3>لا توجد عقود بعد</h3><p>تظهر هنا العقود بعد تأكيد الحجوزات</p></div>';
      return html;
    }

    html += '<div class="grid-3">';
    contracts.forEach(function (c) {
      var prop = getPropertyById(c.propertyId);
      var tenant = getUserById(c.tenantId);
      html += '<div class="card"><div class="card-body">';
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-3)">';
      html += '<h4 style="font-size:var(--font-md)">' + c.title + '</h4>';
      html += '<span class="badge ' + getStatusBadgeClass(c.status) + '">' + getStatusLabel(c.status) + '</span>';
      html += '</div>';
      html += '<div style="font-size:var(--font-sm);color:var(--text-secondary);margin-bottom:var(--space-3)">';
      html += '<div>العقار: ' + (prop ? prop.title : '-') + '</div>';
      html += '<div>المستأجر: ' + (tenant ? tenant.firstName + ' ' + tenant.lastName : '-') + '</div>';
      html += '<div>تاريخ الإنشاء: ' + formatDate(c.createdAt) + '</div>';
      html += '</div>';
      html += '<div style="font-size:var(--font-xs);color:var(--text-muted);margin-bottom:var(--space-3)">';
      html += 'التوقيعات: ' + (c.signedBy.length > 0 ? c.signedBy.map(function (id) { var u = getUserById(id); return u ? u.firstName : ''; }).join('، ') : 'لم يُوقع بعد');
      html += '</div>';
      html += '<div style="display:flex;gap:var(--space-2)">';
      if (c.pdfUrl) {
        html += '<button class="btn btn-sm btn-primary">&#128196; عرض العقد</button>';
      }
      if (c.status === 'pending_signing' && c.signedBy.indexOf(user.id) < 0) {
        html += '<button class="btn btn-sm btn-success" onclick="OwnerPages.signContract(\'' + c.id + '\')">&#9997; توقيع العقد</button>';
      }
      html += '</div>';
      html += '</div></div>';
    });
    html += '</div>';

    return html;
  },

  signContract: function (id) {
    Modal.confirm('توقيع العقد', 'هل أنت متأكد من توقيع هذا العقد؟', function () {
      var c = MockData.contracts.find(function (x) { return x.id === id; });
      if (c) {
        c.signedBy.push(App.currentUser.id);
        if (c.signedBy.length >= 2) {
          c.status = 'active';
          Toast.success('تم', 'تم توقيع العقد بنجاح وأصبح نشطاً');
        } else {
          Toast.info('تم', 'تم تسجيل توقيعك. في انتظار توقيع الطرف الآخر');
        }
        Router.handleRoute();
      }
    });
  },

  renderPayments: function () {
    var user = App.currentUser;
    var payments = MockData.payments.filter(function (p) {
      var booking = MockData.bookings.find(function (b) { return b.id === p.bookingId; });
      return booking && booking.ownerId === user.id;
    });

    var html = '<div class="page-header"><div><h1 class="page-title">المدفوعات</h1><p class="page-subtitle">' + payments.length + ' معاملة</p></div></div>';

    if (payments.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128179;</div><h3>لا توجد مدفوعات بعد</h3><p>تظهر هنا مدفوعات المستأجرين لعقاراتك</p></div>';
      return html;
    }

    var totalReceived = payments.filter(function (p) { return p.status === 'completed'; }).reduce(function (s, p) { return s + p.amount; }, 0);
    var totalPending = payments.filter(function (p) { return p.status === 'pending'; }).reduce(function (s, p) { return s + p.amount; }, 0);

    html += '<div class="grid-3" style="margin-bottom:var(--space-6)">';
    html += '<div class="stat-card"><div class="stat-icon green">&#128176;</div><div class="stat-info"><div class="stat-value">' + formatPrice(totalReceived) + '</div><div class="stat-label">إجمالي المستلم</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#9203;</div><div class="stat-info"><div class="stat-value">' + formatPrice(totalPending) + '</div><div class="stat-label">قيد الانتظار</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon blue">&#128179;</div><div class="stat-info"><div class="stat-value">' + payments.length + '</div><div class="stat-label">عدد المعاملات</div></div></div>';
    html += '</div>';

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>رقم المعاملة</th><th>المستخدم</th><th>المبلغ</th><th>الطريقة</th><th>البوابة</th><th>الحالة</th><th>التاريخ</th>';
    html += '</tr></thead><tbody>';

    payments.forEach(function (pay) {
      var payer = getUserById(pay.userId);
      html += '<tr>';
      html += '<td class="font-mono">' + pay.invoiceId + '</td>';
      html += '<td>' + (payer ? payer.firstName + ' ' + payer.lastName : '-') + '</td>';
      html += '<td><strong>' + formatPrice(pay.amount) + '</strong></td>';
      html += '<td>' + (pay.paymentMethod === 'credit_card' ? 'بطاقة ائتمان' : 'تحويل بنكي') + '</td>';
      html += '<td>' + pay.paymentGateway + '</td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(pay.status) + '">' + getStatusLabel(pay.status) + '</span></td>';
      html += '<td>' + formatDate(pay.createdAt) + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table></div></div>';
    return html;
  },

  renderInquiries: function () {
    var user = App.currentUser;
    var properties = getPropertiesByOwner(user.id);
    var propertyIds = properties.map(function (p) { return p.id; });
    var inquiries = MockData.inquiries.filter(function (inq) {
      return propertyIds.indexOf(inq.propertyId) >= 0;
    });

    var html = '<div class="page-header"><div><h1 class="page-title">الاستفسارات</h1><p class="page-subtitle">' + inquiries.length + ' استفسار</p></div></div>';

    if (inquiries.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128172;</div><h3>لا توجد استفسارات بعد</h3><p>تظهر هنا استفسارات الباحثين عن عقاراتك</p></div>';
      return html;
    }

    html += '<div style="display:flex;flex-direction:column;gap:var(--space-4)">';
    inquiries.forEach(function (inq) {
      var prop = getPropertyById(inq.propertyId);
      var seeker = getUserById(inq.seekerId);
      html += '<div class="card"><div class="card-body">';
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-3)">';
      html += '<div style="display:flex;align-items:center;gap:var(--space-3)">';
      html += '<div class="avatar avatar-sm">' + (seeker ? seeker.firstName.charAt(0) : '?') + '</div>';
      html += '<div>';
      html += '<div style="font-weight:600">' + (seeker ? seeker.firstName + ' ' + seeker.lastName : 'مستخدم') + '</div>';
      html += '<div style="font-size:var(--font-xs);color:var(--text-secondary)">' + (prop ? prop.title : '-') + ' | ' + formatDate(inq.createdAt) + '</div>';
      html += '</div>';
      html += '</div>';
      html += '<span class="badge ' + getStatusBadgeClass(inq.status) + '">' + getStatusLabel(inq.status) + '</span>';
      html += '</div>';
      html += '<div style="padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:var(--space-3);font-size:var(--font-sm)">' + inq.message + '</div>';
      if (inq.reply) {
        html += '<div style="padding:var(--space-3);background:var(--primary-50);border-radius:var(--radius);border-right:3px solid var(--primary);font-size:var(--font-sm)"><strong>ردك:</strong> ' + inq.reply + '</div>';
      } else {
        html += '<button class="btn btn-sm btn-primary" onclick="OwnerPages.replyToInquiry(\'' + inq.id + '\')">&#128172; رد على الاستفسار</button>';
      }
      html += '</div></div>';
    });
    html += '</div>';

    return html;
  },

  replyToInquiry: function (id) {
    var inq = MockData.inquiries.find(function (x) { return x.id === id; });
    if (!inq) return;
    var prop = getPropertyById(inq.propertyId);
    var seeker = getUserById(inq.seekerId);

    var content = '<form id="replyInquiryForm">';
    content += '<div style="margin-bottom:var(--space-3);font-size:var(--font-sm);color:var(--text-secondary)">';
    content += '<div><strong>الاستفسار من:</strong> ' + (seeker ? seeker.firstName + ' ' + seeker.lastName : '') + '</div>';
    content += '<div><strong>العقار:</strong> ' + (prop ? prop.title : '-') + '</div>';
    content += '</div>';
    content += '<div style="padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:var(--space-4);font-size:var(--font-sm)">' + inq.message + '</div>';
    content += '<div class="form-group"><label class="form-label">ردك *</label><textarea id="inquiryReplyText" class="form-input" rows="4" placeholder="اكتب ردك هنا..." required></textarea></div>';
    content += '</form>';

    Modal.show({
      title: 'الرد على الاستفسار',
      content: content,
      confirmText: 'إرسال الرد',
      onConfirm: function (close) {
        var replyText = document.getElementById('inquiryReplyText').value.trim();
        if (!replyText) {
          Toast.error('خطأ', 'يرجى كتابة الرد');
          return;
        }
        inq.reply = replyText;
        inq.status = 'replied';
        close();
        Toast.success('تم', 'تم إرسال الرد بنجاح');
        Router.handleRoute();
      }
    });
  }
};

