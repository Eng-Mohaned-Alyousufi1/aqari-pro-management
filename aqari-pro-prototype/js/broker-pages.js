var BrokerPages = {
  renderDashboard: function() {
    var user = App.currentUser;
    var brokerProps = MockData.properties.filter(function(p) { return p.ownerId === user.id; });
    var team = MockData.teamMembers.filter(function(t) { return t.brokerId === user.id; });
    var totalViews = brokerProps.reduce(function(s, p) { return s + p.views; }, 0);
    var totalFavorites = brokerProps.reduce(function(s, p) { return s + p.favorites; }, 0);

    var html = '<div class="page-header"><div><h1 class="page-title">\u0644\u0648\u062d\u062f\u0629 \u062a\u062d\u0643\u0645 \u0627\u0644\u0648\u0633\u064a\u0637</h1><p class="page-subtitle">\u0645\u0631\u062d\u0628\u064b\u0627 ' + user.firstName + '</p></div></div>';

    html += '<div class="grid-4" style="margin-bottom:var(--space-8)">';
    html += '<div class="stat-card"><div class="stat-icon blue">&#127968;</div><div class="stat-info"><div class="stat-value">' + brokerProps.length + '</div><div class="stat-label">\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#128101;</div><div class="stat-info"><div class="stat-value">' + team.length + '</div><div class="stat-label">\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064a\u0642</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#128065;</div><div class="stat-info"><div class="stat-value">' + totalViews.toLocaleString() + '</div><div class="stat-label">\u0627\u0644\u0645\u0634\u0627\u0647\u062f\u0627\u062a</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon red">&#10084;</div><div class="stat-info"><div class="stat-value">' + totalFavorites + '</div><div class="stat-label">\u0627\u0644\u0645\u0641\u0636\u0644\u0629</div></div></div>';
    html += '</div>';

    html += '<div class="grid-2" style="margin-bottom:var(--space-6)">';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u0622\u062e\u0631 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</h3></div><div class="card-body">';
    if (brokerProps.length === 0) {
      html += '<div class="empty-state" style="padding:var(--space-6)"><div class="empty-state-icon">&#127968;</div><h3>\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0642\u0627\u0631\u0627\u062a</h3></div>';
    } else {
      brokerProps.slice(0, 5).forEach(function(p) {
        html += '<div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--border-light)">';
        html += '<div style="width:60px;height:60px;border-radius:var(--radius);overflow:hidden;flex-shrink:0"><img src="' + (p.images[0] || 'https://via.placeholder.com/60') + '" style="width:100%;height:100%;object-fit:cover"></div>';
        html += '<div style="flex:1"><strong style="font-size:var(--font-sm)">' + p.title + '</strong><div style="font-size:var(--font-xs);color:var(--text-secondary)">' + formatPrice(p.price) + '</div></div>';
        html += '<span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span>';
        html += '</div>';
      });
    }
    html += '</div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064a\u0642</h3></div><div class="card-body">';
    if (team.length === 0) {
      html += '<div class="empty-state" style="padding:var(--space-6)"><div class="empty-state-icon">&#128101;</div><h3>\u0644\u0627 \u064a\u0648\u062c\u062f \u0623\u0639\u0636\u0627\u0621</h3></div>';
    } else {
      team.slice(0, 5).forEach(function(t) {
        html += '<div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--border-light)">';
        html += '<div class="avatar avatar-sm">' + t.name.charAt(0) + '</div>';
        html += '<div style="flex:1"><strong style="font-size:var(--font-sm)">' + t.name + '</strong><div style="font-size:var(--font-xs);color:var(--text-secondary)">' + t.propertiesCount + ' \u0639\u0642\u0627\u0631</div></div>';
        html += '<span class="badge badge-success">' + getStatusLabel(t.status) + '</span>';
        html += '</div>';
      });
    }
    html += '</div></div></div>';

    html += '<div class="card"><div class="card-body"><div class="chart-placeholder">&#128200; \u062e\u0637\u0637 \u0627\u0644\u0623\u062f\u0627\u0621 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a</div></div></div>';
    return html;
  },

  renderPortfolio: function() {
    var user = App.currentUser;
    var properties = MockData.properties.filter(function(p) { return p.ownerId === user.id; });
    var html = '<div class="page-header"><div><h1 class="page-title">\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u062d\u0641\u0638\u0629</h1><p class="page-subtitle">' + properties.length + ' \u0639\u0642\u0627\u0631</p></div></div>';

    html += '<div class="filter-bar"><input type="text" class="form-input" placeholder="\u0628\u062d\u062b..." style="max-width:300px" onkeyup="BrokerPages.filterPortfolio(this.value)"><select class="form-select" style="max-width:180px"><option value="">\u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option><option value="villa">\u0641\u064a\u0644\u0627</option><option value="apartment">\u0634\u0642\u0629</option></select></div>';

    if (properties.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#127968;</div><h3>\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0642\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u062d\u0641\u0638\u0629</h3></div>';
      return html;
    }

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr><th>\u0627\u0644\u0639\u0642\u0627\u0631</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u0627\u0644\u0633\u0639\u0631</th><th>\u0627\u0644\u0645\u0634\u0627\u0647\u062f\u0627\u062a</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0626\u0627\u062a</th></tr></thead><tbody>';
    properties.forEach(function(p) {
      html += '<tr>';
      html += '<td><strong>' + p.title + '</strong><div style="font-size:var(--font-xs);color:var(--text-secondary)">' + p.district + '</div></td>';
      html += '<td><span class="badge badge-neutral">' + getPropertyTypeLabel(p.propertyType) + '</span></td>';
      html += '<td><span class="badge ' + getStatusBadgeClass(p.status) + '">' + getStatusLabel(p.status) + '</span></td>';
      html += '<td>' + formatPrice(p.price) + '</td>';
      html += '<td>' + p.views + '</td>';
      html += '<td><div class="btn-group"><button class="btn btn-sm btn-secondary" onclick="Router.navigate(\'/property/' + p.id + '\')">&#128065;</button></div></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  },

  filterPortfolio: function(q) {
    Toast.info('\u0628\u062d\u062b', '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u0635\u0641\u064a\u0629...');
  },

  renderTeam: function() {
    var user = App.currentUser;
    var team = MockData.teamMembers.filter(function(t) { return t.brokerId === user.id; });
    var html = '<div class="page-header"><div><h1 class="page-title">\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0641\u0631\u064a\u0642</h1><p class="page-subtitle">' + team.length + ' \u0639\u0636\u0648</p></div>';
    html += '<div class="page-header-right"><button class="btn btn-primary" onclick="BrokerPages.addTeamMember()">&#10133; \u0636\u0645 \u0639\u0636\u0648</button></div></div>';

    if (team.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">&#128101;</div><h3>\u0644\u0627 \u064a\u0648\u062c\u062f \u0623\u0639\u0636\u0627\u0621 \u0641\u0631\u064a\u0642</h3><p>\u0623\u0636\u0641 \u0639\u0636\u0648\u064b\u0627 \u062c\u062f\u064a\u062f\u064b\u0627 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0641\u064a \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</p></div>';
      return html;
    }

    html += '<div class="card"><div class="table-container"><table class="data-table"><thead><tr><th>\u0627\u0644\u0639\u0636\u0648</th><th>\u0627\u0644\u0628\u0631\u064a\u062f</th><th>\u0627\u0644\u062f\u0648\u0631</th><th>\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</th><th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0626\u0627\u062a</th></tr></thead><tbody>';
    team.forEach(function(t) {
      html += '<tr>';
      html += '<td><div style="display:flex;align-items:center;gap:var(--space-2)"><div class="avatar avatar-sm">' + t.name.charAt(0) + '</div><strong>' + t.name + '</strong></div></td>';
      html += '<td>' + t.email + '</td>';
      html += '<td><span class="badge badge-primary">' + (t.role === 'agent' ? '\u0645\u0636\u064a\u0641 \u0639\u0642\u0627\u0631\u0627\u062a' : '\u0645\u0633\u0627\u0639\u062f') + '</span></td>';
      html += '<td>' + t.propertiesCount + '</td>';
      html += '<td><span class="badge badge-success">' + getStatusLabel(t.status) + '</span></td>';
      html += '<td><button class="btn btn-sm btn-danger" onclick="BrokerPages.removeTeamMember(\'' + t.id + '\')">&#10006;</button></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  },

  addTeamMember: function() {
    Modal.show({
      title: '\u0636\u0645 \u0639\u0636\u0648 \u062c\u062f\u064a\u062f',
      content: '<form id="addTeamForm">' +
        '<div class="form-group"><label class="form-label">\u0627\u0644\u0627\u0633\u0645</label><input type="text" name="name" class="form-input" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"></div>' +
        '<div class="form-group"><label class="form-label">\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a</label><input type="email" name="email" class="form-input" placeholder="email@example.com"></div>' +
        '<div class="form-group"><label class="form-label">\u0627\u0644\u062f\u0648\u0631</label><select name="role" class="form-select"><option value="agent">\u0645\u0636\u064a\u0641 \u0639\u0642\u0627\u0631\u0627\u062a</option><option value="assistant">\u0645\u0633\u0627\u0639\u062f</option></select></div>' +
        '</form>',
      confirmText: '\u0636\u0645',
      onConfirm: function(close) {
        var form = document.getElementById('addTeamForm');
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        if (!name || !email) { Toast.error('\u062e\u0637\u0623', '\u0627\u0644\u0645\u0644\u0621 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628'); return; }
        MockData.teamMembers.push({ id: generateId(), brokerId: App.currentUser.id, name: name, email: email, role: form.role.value, propertiesCount: 0, status: 'active', joinedAt: new Date().toISOString().split('T')[0] });
        close();
        Toast.success('\u062a\u0645', '\u062a\u0645 \u0636\u0645 \u0627\u0644\u0639\u0636\u0648 \u0628\u0646\u062c\u0627\u062d');
        Router.handleRoute();
      }
    });
  },

  removeTeamMember: function(id) {
    Modal.confirm('\u062d\u0630\u0641 \u0639\u0636\u0648', '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0636\u0648\u061f', function() {
      var idx = MockData.teamMembers.findIndex(function(t) { return t.id === id; });
      if (idx >= 0) { MockData.teamMembers.splice(idx, 1); Toast.success('\u062a\u0645', '\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0639\u0636\u0648'); Router.handleRoute(); }
    });
  },

  renderReports: function() {
    var user = App.currentUser;
    var props = MockData.properties.filter(function(p) { return p.ownerId === user.id; });
    var totalViews = props.reduce(function(s, p) { return s + p.views; }, 0);
    var totalFavs = props.reduce(function(s, p) { return s + p.favorites; }, 0);

    var html = '<div class="page-header"><div><h1 class="page-title">\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631</h1></div></div>';

    html += '<div class="grid-3" style="margin-bottom:var(--space-6)">';
    html += '<div class="stat-card"><div class="stat-icon blue">&#127968;</div><div class="stat-info"><div class="stat-value">' + props.length + '</div><div class="stat-label">\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon green">&#128065;</div><div class="stat-info"><div class="stat-value">' + totalViews.toLocaleString() + '</div><div class="stat-label">\u0627\u0644\u0645\u0634\u0627\u0647\u062f\u0627\u062a</div></div></div>';
    html += '<div class="stat-card"><div class="stat-icon orange">&#10084;</div><div class="stat-info"><div class="stat-value">' + totalFavs + '</div><div class="stat-label">\u0627\u0644\u0645\u0641\u0636\u0644\u0629</div></div></div>';
    html += '</div>';

    html += '<div class="card" style="margin-bottom:var(--space-6)"><div class="card-body"><div class="chart-placeholder">&#128200; \u062e\u0637\u0637 \u0627\u0644\u0623\u062f\u0627\u0621 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a</div></div></div>';

    html += '<div class="card"><div class="card-header"><h3 class="card-title">\u0623\u0641\u0636\u0644 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a \u0623\u062f\u0627\u0621</h3></div><div class="table-container"><table class="data-table"><thead><tr><th>\u0627\u0644\u0639\u0642\u0627\u0631</th><th>\u0627\u0644\u0645\u0634\u0627\u0647\u062f\u0627\u062a</th><th>\u0627\u0644\u0645\u0641\u0636\u0644\u0629</th><th>\u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a</th></tr></thead><tbody>';
    props.sort(function(a, b) { return b.views - a.views; }).slice(0, 5).forEach(function(p) {
      html += '<tr><td><strong>' + p.title + '</strong></td><td>' + p.views + '</td><td>' + p.favorites + '</td><td>' + p.inquiries + '</td></tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  }
};
