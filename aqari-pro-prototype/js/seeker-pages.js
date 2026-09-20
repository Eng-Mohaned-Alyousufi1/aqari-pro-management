var SeekerPages = {
  renderHome: function() {
    var featured = MockData.properties.filter(function(p) { return p.isFeatured && p.status === 'published'; });
    var recent = MockData.properties.filter(function(p) { return p.status === 'published'; }).slice(0, 6);
    var user = App.currentUser;

    var html = '<div class="page-header"><div><h1 class="page-title">\u0645\u0631\u062d\u0628\u064b\u0627 ' + user.firstName + '</h1><p class="page-subtitle">\u0647\u0644\u062b\u0627 \u062a\u0628\u062d\u062b \u0639\u0646 \u0639\u0642\u0627\u0631 \u0645\u0646\u0627\u0633\u0628\u061f</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-8)">';
    html += '<div class="stat-card"><div class="stat-icon blue">&#127968;</div><div class="stat-info"><div class="stat-value">' + MockData.properties.filter(function(p){return p.status==='published';}).length + '</div><div class="stat-label">\u0639\u0642\u0627\u0631 \u0645\u0646\u0634\u0648\u0631</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#10084;</div><div class="stat-info"><div class="stat-value">' + getFavoritesByUser(user.id).length + '</div><div class="stat-label">\u0641\u064a \u0627\u0644\u0645\u0641\u0636\u0644\u0629</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#128197;</div><div class="stat-info"><div class="stat-value">' + getBookingsByUser(user.id).length + '</div><div class="stat-label">\u062d\u062c\u0632</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#128172;</div><div class="stat-info"><div class="stat-value">' + getConversationsByUser(user.id).length + '</div><div class="stat-label">\u0645\u062d\u0627\u062f\u062b\u0629</div></div></div>';
    html += '</div>';

    html += '<div style="margin-bottom:var(--space-8)">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)"><h3>\u0639\u0642\u0627\u0631\u0627\u062a \u0645\u0645\u064a\u0632\u0629</h3><a href="#/search" class="btn btn-ghost btn-sm">\u0639\u0631\u0636 \u0627\u0644\u0643\u0644 &#8592;</a></div>';
    html += '<div class="grid-3">';
    featured.forEach(function(p) { html += SeekerPages.renderPropertyCard(p); });
    html += '</div></div>';

    html += '<div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)"><h3>\u0622\u062e\u0631 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</h3><a href="#/search" class="btn btn-ghost btn-sm">\u0639\u0631\u0636 \u0627\u0644\u0643\u0644 &#8592;</a></div>';
    html += '<div class="grid-3">';
    recent.forEach(function(p) { html += SeekerPages.renderPropertyCard(p); });
    html += '</div></div>';

    return html;
  },

  renderPropertyCard: function(p) {
    var img = p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/400x200?text=\u0639\u0642\u0627\u0631';
    var isFav = MockData.favorites.some(function(f) { return f.userId === App.currentUser.id && f.propertyId === p.id; });
    return '<div class="property-card" onclick="Router.navigate(\'/property/' + p.id + '\')">' +
      '<div class="property-card-image">' +
        '<img src="' + img + '" alt="' + p.title + '" loading="lazy">' +
        '<span class="property-badge badge ' + (p.listingType === 'sale' ? 'badge-primary' : 'badge-success') + '">' + getListingTypeLabel(p.listingType) + '</span>' +
        '<button class="favorite-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation();SeekerPages.toggleFavorite(\'' + p.id + '\')">&#10084;</button>' +
      '</div>' +
      '<div class="property-card-body">' +
        '<div class="property-card-price">' + formatPrice(p.price) + (p.listingType === 'rent' ? ' / \u0633\u0646\u0648\u064a\u0629' : '') + '</div>' +
        '<div class="property-card-title">' + p.title + '</div>' +
        '<div class="property-card-location">&#128205; ' + p.district + ', ' + p.city + '</div>' +
        '<div class="property-card-features">' +
          '<span>&#128716; ' + p.bedrooms + ' \u063a\u0631\u0641</span>' +
          '<span>&#128703; ' + p.bathrooms + ' \u062d\u0645\u0627\u0645</span>' +
          '<span>&#128207; ' + p.areaSqm + ' \u0645\u00B2</span>' +
        '</div>' +
      '</div></div>';
  },

  toggleFavorite: function(propId) {
    var userId = App.currentUser.id;
    var idx = MockData.favorites.findIndex(function(f) { return f.userId === userId && f.propertyId === propId; });
    if (idx >= 0) {
      MockData.favorites.splice(idx, 1);
      Toast.info('\u062a\u0645', '\u062a\u0645\u062a \u0625\u0632\u0627\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0641\u0636\u0644\u0629');
    } else {
      MockData.favorites.push({ userId: userId, propertyId: propId, createdAt: new Date().toISOString() });
      Toast.success('\u062a\u0645', '\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0642\u0627\u0631 \u0644\u0644\u0645\u0641\u0636\u0644\u0629');
    }
    Router.handleRoute();
  },

  renderSearch: function() {
    var urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    var q = urlParams.get('q') || '';
    var results = searchProperties(q);

    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</h1><p class="page-subtitle">' + results.length + ' \u0639\u0642\u0627\u0631 \u0645\u0648\u062c\u0648\u062f</p></div></div>';

    html += '<div class="filter-bar">' +
      '<input type="text" class="form-input" id="searchInput" placeholder="\u0627\u0644\u0628\u062d\u062b..." value="' + q + '" style="max-width:300px">' +
      '<select class="form-select" id="filterType" style="max-width:180px" onchange="SeekerPages.applyFilters()">' +
        '<option value="">\u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>' +
        '<option value="villa">\u0641\u064a\u0644\u0627</option><option value="apartment">\u0634\u0642\u0629</option>' +
        '<option value="studio">\u0627\u0633\u062a\u0648\u062f\u064a\u0648</option><option value="duplex">\u062f\u0648\u0628\u0644\u0643\u0633</option>' +
        '<option value="office">\u0645\u0643\u062a\u0628</option><option value="land">\u0623\u0631\u0636</option>' +
      '</select>' +
      '<select class="form-select" id="filterListing" style="max-width:180px" onchange="SeekerPages.applyFilters()">' +
        '<option value="">\u0627\u0644\u0643\u0644</option>' +
        '<option value="sale">\u0644\u0644\u0628\u064a\u0639</option><option value="rent">\u0644\u0644\u0625\u064a\u062c\u0627\u0631</option>' +
      '</select>' +
      '<select class="form-select" id="filterBedrooms" style="max-width:160px" onchange="SeekerPages.applyFilters()">' +
        '<option value="">\u063a\u0631\u0641 \u0646\u0648\u0645</option>' +
        '<option value="0">\u0633\u062a\u0648\u062f\u064a\u0648</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5+</option>' +
      '</select>' +
      '<button class="btn btn-primary" onclick="SeekerPages.applyFilters()">&#128269; \u0628\u062d\u062b</button>' +
    '</div>';

    html += '<div id="searchResults" class="grid-3">';
    if (results.length === 0) {
      html += '<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">&#128269;</div><h3>\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0642\u0627\u0631\u0627\u062a</h3><p>\u062c\u0631\u0628 \u062a\u063a\u064a\u064a\u0631 \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0628\u062d\u062b</p></div>';
    } else {
      results.forEach(function(p) { html += SeekerPages.renderPropertyCard(p); });
    }
    html += '</div>';
    return html;
  },

  applyFilters: function() {
    var q = document.getElementById('searchInput').value;
    var type = document.getElementById('filterType').value;
    var listing = document.getElementById('filterListing').value;
    var beds = document.getElementById('filterBedrooms').value;
    var results = searchProperties(q, { propertyType: type, listingType: listing, bedrooms: beds });
    var container = document.getElementById('searchResults');
    if (results.length === 0) {
      container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">&#128269;</div><h3>\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631</h3><p>\u062c\u0631\u0628 \u062a\u063a\u064a\u064a\u0631 \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0628\u062d\u062b</p></div>';
    } else {
      container.innerHTML = '';
      results.forEach(function(p) { container.innerHTML += SeekerPages.renderPropertyCard(p); });
    }
  },

  renderPropertyDetails: function(params) {
    var p = getPropertyById(params.id);
    if (!p) return '<div class="empty-state"><h3>\u0627\u0644\u0639\u0642\u0627\u0631 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f</h3></div>';
    var owner = getUserById(p.ownerId);
    var isFav = MockData.favorites.some(function(f) { return f.userId === App.currentUser.id && f.propertyId === p.id; });
    var reviews = MockData.reviews.filter(function(r) { return r.propertyId === p.id; });
    var avgRating = reviews.length ? (reviews.reduce(function(s, r) { return s + r.rating; }, 0) / reviews.length).toFixed(1) : '0';

    var html = '<div class="breadcrumb"><a href="#/home">\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629</a><span class="breadcrumb-separator">/</span><a href="#/search">\u0627\u0644\u0628\u062d\u062b</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">' + p.title + '</span></div>';

    html += '<div class="property-gallery" style="margin-bottom:var(--space-6)">';
    html += '<div class="property-gallery-main"><img src="' + (p.images[0] || 'https://via.placeholder.com/800x400') + '" alt="' + p.title + '"></div>';
    html += '<div class="property-gallery-side">';
    if (p.images[1]) html += '<img src="' + p.images[1] + '" alt="">';
    if (p.images[2]) html += '<img src="' + p.images[2] + '" alt="">';
    html += '</div></div>';

    html += '<div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--space-6)">';
    html += '<div>';
    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-body">';
    html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-4)">';
    html += '<div><h1 style="font-size:var(--font-2xl);margin-bottom:var(--space-2)">' + p.title + '</h1>';
    html += '<p style="color:var(--text-secondary)">&#128205; ' + p.district + ', ' + p.city + '</p></div>';
    html += '<span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span></div>';
    html += '<div style="font-size:var(--font-3xl);font-weight:700;color:var(--primary);margin-bottom:var(--space-4)">' + formatPrice(p.price) + (p.listingType === 'rent' ? ' / \u0633\u0646\u0648\u064a\u0629' : '') + '</div>';
    html += '<div style="display:flex;gap:var(--space-6);margin-bottom:var(--space-4)">';
    html += '<span>&#128716; ' + p.bedrooms + ' \u063a\u0631\u0641\u0629</span>';
    html += '<span>&#128703; ' + p.bathrooms + ' \u062d\u0645\u0627\u0645</span>';
    html += '<span>&#128207; ' + p.areaSqm + ' \u0645\u00B2</span>';
    if (p.parking > 0) html += '<span>&#128663; ' + p.parking + ' \u0645\u0648\u0642\u0641</span>';
    html += '</div>';
    html += '<p style="margin-bottom:var(--space-4)">' + p.description + '</p>';
    if (p.amenities.length > 0) {
      html += '<h4 style="margin-bottom:var(--space-3)">\u0627\u0644\u0645\u0631\u0627\u0641\u0642</h4>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">';
      p.amenities.forEach(function(a) { html += '<span class="badge badge-primary">' + a + '</span>'; });
      html += '</div>';
    }
    html += '</div></div>';

    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-header"><h3 class="card-title">\u0627\u0644\u062a\u0642\u064a\u064a\u0645\u0627\u062a</h3></div><div class="card-body"><div class="rating" style="margin-bottom:var(--space-2)">';
    for (var i = 1; i <= 5; i++) html += '<span class="rating-star ' + (i <= Math.round(avgRating) ? 'filled' : '') + '">&#9733;</span>';
    html += '<span style="margin-inline-start:var(--space-2);font-size:var(--font-sm);color:var(--text-secondary)">' + avgRating + ' (' + reviews.length + ' \u062a\u0642\u064a\u064a\u0645)</span></div>';
    reviews.forEach(function(r) {
      var reviewer = getUserById(r.userId);
      html += '<div style="padding:var(--space-3) 0;border-top:1px solid var(--border-light)"><div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-2)"><div class="avatar avatar-sm">' + (reviewer ? reviewer.firstName.charAt(0) : '?') + '</div><strong style="font-size:var(--font-sm)">' + (reviewer ? reviewer.firstName : '') + '</strong></div><p style="font-size:var(--font-sm);margin:0">' + r.comment + '</p></div>';
    });
    html += '</div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629</h3></div><div class="card-body"><div class="map-placeholder">&#128205; \u062e\u0631\u064a\u0637\u0629 \u062a\u0639\u064a\u064a\u0646\u064a\u0629 - ' + p.district + ', ' + p.city + '</div></div></div>';
    html += '</div>';

    html += '<div>';
    html += '<div class="card" style="margin-bottom:var(--space-4)"><div class="card-body" style="text-align:center">';
    html += '<button class="btn btn-primary btn-block btn-lg" onclick="SeekerPages.bookProperty(\'' + p.id + '\')" style="margin-bottom:var(--space-3)">&#128197; \u0627\u062d\u062c\u0632 \u0627\u0644\u0639\u0642\u0627\u0631</button>';
    html += '<button class="btn btn-secondary btn-block" onclick="SeekerPages.toggleFavorite(\'' + p.id + '\')">&#10084; ' + (isFav ? '\u0625\u0632\u0627\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0641\u0636\u0644\u0629' : '\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0645\u0641\u0636\u0644\u0629') + '</button>';
    html += '<button class="btn btn-ghost btn-block" onclick="SeekerPages.startChat(\'' + p.id + '\')">&#128172; \u062a\u062d\u062f\u062b \u0645\u0639 \u0627\u0644\u0645\u0627\u0644\u0643</button>';
    html += '</div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u0645\u0627\u0644\u0643 \u0627\u0644\u0639\u0642\u0627\u0631\u064a</h3></div><div class="card-body" style="text-align:center">';
    html += '<div class="avatar avatar-lg" style="margin:0 auto var(--space-3)">' + (owner ? owner.firstName.charAt(0) : '?') + '</div>';
    html += '<h4>' + (owner ? owner.firstName + ' ' + owner.lastName : '') + '</h4>';
    html += '<span class="badge badge-success" style="margin-bottom:var(--space-3)">&#10004; ' + getStatusLabel(owner ? owner.kycStatus : '') + '</span>';
    html += '<p style="font-size:var(--font-xs);color:var(--text-secondary)">\u0645\u0639\u0646\u064a \u0645\u0646\u0630 ' + formatDate(owner ? owner.createdAt : '') + '</p>';
    html += '</div></div>';
    html += '</div></div>';

    return html;
  },

  bookProperty: function(propId) {
    var p = getPropertyById(propId);
    if (!p) return;
    var minAmount = p.listingType === 'rent' ? p.price : Math.round(p.price * 0.05);
    Modal.show({
      title: '\u062d\u062c\u0632 \u0627\u0644\u0639\u0642\u0627\u0631',
      content: '<form id="bookingForm">' +
        '<div class="form-group"><label class="form-label">\u0627\u0644\u0639\u0642\u0627\u0631</label><input type="text" class="form-input" value="' + p.title + '" disabled></div>' +
        '<div class="form-group"><label class="form-label">\u0627\u0644\u0645\u0628\u0644\u063a (\u0631\u064a\u0627\u0644)</label><input type="number" id="bookingAmount" class="form-input" value="' + minAmount + '" min="' + minAmount + '" placeholder="\u0627\u0644\u0645\u0628\u0644\u063a"></div>' +
        '<div class="form-group"><label class="form-label">\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0628\u062f\u0621</label><input type="date" id="checkInDate" class="form-input"></div>' +
        '<div class="form-group"><label class="form-label">\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0646\u0647\u0627\u0621</label><input type="date" id="checkOutDate" class="form-input"></div>' +
        '<div class="form-group"><label class="form-label">\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639</label>' +
          '<select id="paymentMethod" class="form-select"><option value="credit_card">\u0628\u0637\u0627\u0642\u0629 \u0627\u0639\u062a\u0645\u0627\u062f</option><option value="bank_transfer">\u062a\u062d\u0648\u064a\u0644 \u0628\u0646\u0643\u064a</option></select>' +
        '</div>' +
        '<div style="padding:var(--space-3);background:var(--warning-50);border-radius:var(--radius);font-size:var(--font-xs);color:var(--warning)">&#9888; \u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 ' + formatPrice(minAmount) + '</div>' +
        '</form>',
      confirmText: '\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632',
      onConfirm: function(close) {
        var amount = parseInt(document.getElementById('bookingAmount').value);
        if (amount < minAmount) {
          Toast.error('\u062e\u0637\u0623', '\u0627\u0644\u0645\u0628\u0644\u063a \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649');
          return;
        }
        var newBooking = {
          id: generateId(), propertyId: p.id, seekerId: App.currentUser.id, ownerId: p.ownerId,
          status: 'pending', bookingAmount: amount,
          checkInDate: document.getElementById('checkInDate').value,
          checkOutDate: document.getElementById('checkOutDate').value,
          createdAt: new Date().toISOString().split('T')[0], escrowStatus: 'pending'
        };
        MockData.bookings.push(newBooking);
        close();
        Toast.success('\u062a\u0645', '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u062c\u0632 \u0628\u0646\u062c\u0627\u062d');
        Router.navigate('/bookings');
      }
    });
  },

  startChat: function(propId) {
    var p = getPropertyById(propId);
    if (!p) return;
    var conv = MockData.conversations.find(function(c) { return c.propertyId === propId && c.participants.includes(App.currentUser.id); });
    if (!conv) {
      conv = { id: generateId(), propertyId: propId, participants: [App.currentUser.id, p.ownerId], lastMessage: '', lastMessageAt: new Date().toISOString(), unreadCount: 0, status: 'active' };
      MockData.conversations.push(conv);
    }
    Router.navigate('/chat/' + conv.id);
  },

  renderBookings: function() {
    var user = App.currentUser;
    var bookings = getBookingsByUser(user.id);
    var html = '<div class="page-header"><div><h1 class="page-title">\u062d\u062c\u0648\u0632\u0627\u062a\u064a</h1></div></div>';

    if (bookings.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128197;</div><h3>\u0644\u0627 \u062a\u0633\u062c\u0644 \u062d\u062c\u0632\u0627\u062a \u0645\u0633\u0628\u0642\u0629</h3><p>\u0628\u062f\u0623 \u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0639\u0642\u0627\u0631 \u0644\u0628\u062f\u0621 \u062d\u062c\u0632</p><button class="btn btn-primary" onclick="Router.navigate(\'/search\')">&#128269; \u0628\u062d\u062b \u0639\u0646 \u0639\u0642\u0627\u0631</button></div>';
      return html;
    }

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr>';
    html += '<th>\u0627\u0644\u0639\u0642\u0627\u0631</th><th>\u0627\u0644\u0645\u0628\u0644\u063a</th><th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0628\u062f\u0621</th><th>\u0627\u0644\u0625\u0646\u0634\u0627\u0621</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>';
    bookings.forEach(function(b) {
      var prop = getPropertyById(b.propertyId);
      html += '<tr>';
      html += '<td><strong>' + (prop ? prop.title : '-') + '</strong></td>';
      html += '<td>' + formatPrice(b.bookingAmount) + '</td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(b.status) + '">' + getStatusLabel(b.status) + '</span></td>';
      html += '<td>' + formatDate(b.checkInDate) + '</td>';
      html += '<td>' + formatDate(b.createdAt) + '</td>';
      html += '<td><div class="btn-group">';
      html += '<button class="btn btn-sm btn-secondary" onclick="Router.navigate(\'/booking/' + b.id + '\')">&#128065; \u062a\u0641\u0627\u0635\u064a\u0644</button>';
      if (b.status === 'pending' && b.ownerId === user.id) {
        html += '<button class="btn btn-sm btn-success" onclick="SeekerPages.confirmBooking(\'' + b.id + '\')">&#10004; \u062a\u0623\u0643\u064a\u062f</button>';
        html += '<button class="btn btn-sm btn-danger" onclick="SeekerPages.cancelBooking(\'' + b.id + '\')">&#10006; \u0631\u0641\u0636</button>';
      }
      html += '</div></td></tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  },

  renderBookingDetails: function(params) {
    var b = MockData.bookings.find(function(x) { return x.id === params.id; });
    if (!b) return '<div class="empty-state"><h3>\u0627\u0644\u062d\u062c\u0632 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f</h3></div>';
    var prop = getPropertyById(b.propertyId);
    var escrow = MockData.escrow.find(function(e) { return e.bookingId === b.id; });

    var html = '<div class="breadcrumb"><a href="#/home">\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629</a><span class="breadcrumb-separator">/</span><a href="#/bookings">\u0627\u0644\u062d\u062c\u0648\u0632\u0627\u062a</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062d\u062c\u0632</span></div>';
    html += '<h1 class="page-title" style="margin-bottom:var(--space-6)">\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062d\u062c\u0632</h1>';

    html += '<div class="grid-2">';
    html += '<div><div class="card"><div class="card-body">';
    html += '<h3 style="margin-bottom:var(--space-4)">' + (prop ? prop.title : '') + '</h3>';
    html += '<div class="detail-grid">';
    html += '<div class="detail-item"><span class="detail-label">\u0645\u0631\u0642\u0645 \u0627\u0644\u062d\u062c\u0632</span><span class="detail-value font-mono">' + b.id + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u0627\u0644\u0645\u0628\u0644\u063a</span><span class="detail-value">' + formatPrice(b.bookingAmount) + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u0627\u0644\u062d\u0627\u0644\u0629</span><span class="detail-value"><span class="badge ' + getStatusBadgeClass(b.status) + '">' + getStatusLabel(b.status) + '</span></span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0628\u062f\u0621</span><span class="detail-value">' + formatDate(b.checkInDate) + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0646\u0647\u0627\u0621</span><span class="detail-value">' + formatDate(b.checkOutDate) + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">\u062a\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0621</span><span class="detail-value">' + formatDate(b.createdAt) + '</span></div>';
    html += '</div>';
    html += '<div style="margin-top:var(--space-6);display:flex;gap:var(--space-3)">';
    if (b.status === 'pending') {
      html += '<button class="btn btn-success" onclick="SeekerPages.confirmBooking(\'' + b.id + '\')">&#10004; \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632</button>';
      html += '<button class="btn btn-danger" onclick="SeekerPages.cancelBooking(\'' + b.id + '\')">&#10006; \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632</button>';
    }
    html += '</div>';
    html += '</div></div></div>';

    html += '<div><div class="card"><div class="card-header"><h3 class="card-title">\u0627\u0644\u0636\u0645\u0627\u0646 \u0627\u0644\u0645\u0627\u0644\u064a</h3></div><div class="card-body">';
    if (escrow) {
      html += '<div class="detail-grid" style="margin-bottom:var(--space-4)">';
      html += '<div class="detail-item"><span class="detail-label">\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0643\u0644\u064a</span><span class="detail-value">' + formatPrice(escrow.totalAmount) + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">\u0645\u062a\u0645 \u0625\u0633\u0631\u0627\u0621\u0647</span><span class="detail-value text-success">' + formatPrice(escrow.releasedAmount) + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">\u0645\u0645\u0637\u0628\u0642</span><span class="detail-value text-warning">' + formatPrice(escrow.heldAmount) + '</span></div>';
      html += '<div class="detail-item"><span class="detail-label">\u0627\u0644\u062d\u0627\u0644\u0629</span><span class="detail-value"><span class="badge ' + getStatusBadgeClass(escrow.status) + '">' + getStatusLabel(escrow.status) + '</span></span></div>';
      html += '</div>';
      if (escrow.milestones.length > 0) {
        html += '<h4 style="margin-bottom:var(--space-3)">\u0627\u0644\u0645\u0631\u0627\u062d\u0644</h4>';
        html += '<div class="timeline">';
        escrow.milestones.forEach(function(m) {
          html += '<div class="timeline-item"><div class="timeline-dot ' + (m.status === 'released' ? 'green' : m.status === 'held' ? 'orange' : '') + '"></div><div class="timeline-content"><h4>\u0627\u0644\u0645\u0631\u062d\u0644\u0629 ' + m.milestoneNumber + ' - ' + formatPrice(m.amount) + '</h4><p>' + m.description + '</p><p>' + formatDate(m.dueDate) + ' - <span class="badge ' + getStatusBadgeClass(m.status) + '">' + getStatusLabel(m.status) + '</span></p></div></div>';
        });
        html += '</div>';
      }
    } else {
      html += '<div class="empty-state" style="padding:var(--space-8)"><div class="empty-state-icon">&#128176;</div><h3>\u0644\u0645 \u064a\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628 \u0636\u0645\u0627\u0646</h3></div>';
    }
    html += '</div></div></div></div>';
    return html;
  },

  confirmBooking: function(id) {
    Modal.confirm('\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632', '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062a\u0623\u0643\u064a\u062f \u0647\u0630\u0627 \u0627\u0644\u062d\u062c\u0632\u061f', function() {
      var b = MockData.bookings.find(function(x) { return x.id === id; });
      if (b) { b.status = 'confirmed'; Toast.success('\u062a\u0645', '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632'); Router.handleRoute(); }
    });
  },

  cancelBooking: function(id) {
    Modal.confirm('\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632', '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u0644\u063a\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062d\u062c\u0632\u061f', function() {
      var b = MockData.bookings.find(function(x) { return x.id === id; });
      if (b) { b.status = 'cancelled'; Toast.success('\u062a\u0645', '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632'); Router.handleRoute(); }
    });
  },

  renderFavorites: function() {
    var favs = getFavoritesByUser(App.currentUser.id);
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0645\u0641\u0636\u0644\u0629</h1><p class="page-subtitle">' + favs.length + ' \u0639\u0642\u0627\u0631</p></div></div>';
    if (favs.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#10084;</div><h3>\u0644\u0627 \u062a\u0633\u062c\u0644 \u0639\u0642\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0641\u0636\u0644\u0629</h3><button class="btn btn-primary" onclick="Router.navigate(\'/search\')">&#128269; \u062a\u0635\u0641\u062d \u0639\u0642\u0627\u0631\u0627\u062a</button></div>';
      return html;
    }
    html += '<div class="grid-3">';
    favs.forEach(function(p) { if (p) html += SeekerPages.renderPropertyCard(p); });
    html += '</div>';
    return html;
  },

  renderChats: function() {
    var user = App.currentUser;
    var convs = getConversationsByUser(user.id);
    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0627\u062a</h1></div></div>';

    if (convs.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128172;</div><h3>\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u062d\u0627\u062f\u062b\u0627\u062a</h3></div>';
      return html;
    }

    html += '<div class="card">';
    convs.forEach(function(c) {
      var otherId = c.participants.find(function(id) { return id !== user.id; });
      var other = getUserById(otherId);
      var prop = getPropertyById(c.propertyId);
      var time = c.lastMessageAt ? formatDateTime(c.lastMessageAt) : '';
      html += '<div class="notification-item ' + (c.unreadCount > 0 ? 'unread' : '') + '" onclick="Router.navigate(\'/chat/' + c.id + '\')">';
      html += '<div class="avatar">' + (other ? other.firstName.charAt(0) : '?') + '</div>';
      html += '<div style="flex:1;min-width:0">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:var(--font-sm)">' + (other ? other.firstName + ' ' + other.lastName : '') + '</strong><span style="font-size:var(--font-xs);color:var(--text-muted)">' + time + '</span></div>';
      if (prop) html += '<div style="font-size:var(--font-xs);color:var(--primary);margin:2px 0">' + prop.title + '</div>';
      html += '<div style="font-size:var(--font-xs);color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (c.lastMessage || '\u0628\u062f\u0621 \u0645\u062d\u0627\u062f\u062b\u0629...') + '</div>';
      html += '</div>';
      if (c.unreadCount > 0) html += '<span class="badge badge-primary">' + c.unreadCount + '</span>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  renderChat: function(params) {
    var conv = MockData.conversations.find(function(c) { return c.id === params.id; });
    if (!conv) return '<div class="empty-state"><h3>\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f\u0629</h3></div>';
    var otherId = conv.participants.find(function(id) { return id !== App.currentUser.id; });
    var other = getUserById(otherId);
    var messages = getMessagesByConversation(conv.id);
    var prop = getPropertyById(conv.propertyId);

    var html = '<div class="breadcrumb"><a href="#/chats">&#8594; \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0627\u062a</a></div>';
    html += '<div class="card" style="height:calc(100vh - 180px);display:flex;flex-direction:column">';
    html += '<div class="card-header"><div style="display:flex;align-items:center;gap:var(--space-3)">';
    html += '<div class="avatar">' + (other ? other.firstName.charAt(0) : '?') + '</div>';
    html += '<div><strong>' + (other ? other.firstName + ' ' + other.lastName : '') + '</strong>';
    if (prop) html += '<div style="font-size:var(--font-xs);color:var(--primary)">' + prop.title + '</div>';
    html += '</div></div></div>';

    html += '<div class="card-body" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:var(--space-3)" id="chatMessages">';
    messages.forEach(function(m) {
      var isSent = m.senderId === App.currentUser.id;
      html += '<div style="display:flex;' + (isSent ? 'justify-content:flex-start' : 'justify-content:flex-end') + '">';
      html += '<div class="chat-bubble ' + (isSent ? 'sent' : 'received') + '">';
      html += '<div>' + m.content + '</div>';
      html += '<div class="chat-bubble-time">' + formatDateTime(m.createdAt) + '</div>';
      html += '</div></div>';
    });
    html += '</div>';

    html += '<div class="card-footer" style="display:flex;gap:var(--space-2)">';
    html += '<input type="text" class="form-input" id="chatInput" placeholder="\u0627\u0643\u062a\u0628 \u0631\u0633\u0627\u0644\u0629..." onkeyup="if(event.key===\'Enter\')SeekerPages.sendMessage(\'' + conv.id + '\')">';
    html += '<button class="btn btn-primary" onclick="SeekerPages.sendMessage(\'' + conv.id + '\')">&#128172;</button>';
    html += '</div></div>';
    return html;
  },

  sendMessage: function(convId) {
    var input = document.getElementById('chatInput');
    var text = input.value.trim();
    if (!text) return;
    MockData.messages.push({
      id: generateId(), conversationId: convId, senderId: App.currentUser.id,
      content: text, messageType: 'text', isRead: false, createdAt: new Date().toISOString()
    });
    var conv = MockData.conversations.find(function(c) { return c.id === convId; });
    if (conv) { conv.lastMessage = text; conv.lastMessageAt = new Date().toISOString(); }
    input.value = '';
    Router.handleRoute();
  }
};
