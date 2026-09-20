var PageScripts = {};

function registerRoutes() {
  Router.register('/', function() { return AuthPages.renderLogin(); });
  Router.register('/login', function() { return AuthPages.renderLogin(); });
  Router.register('/register', function() { return AuthPages.renderRegister(); });
  Router.register('/otp', function() { return AuthPages.renderOTP(); });
  Router.register('/forgot-password', function() { return AuthPages.renderForgotPassword(); });

  Router.register('/home', function() { return SeekerPages.renderHome(); });
  Router.register('/search', function() { return SeekerPages.renderSearch(); });
  Router.register('/property', function(p) { return SeekerPages.renderPropertyDetails(p); });
  Router.register('/bookings', function() { return SeekerPages.renderBookings(); });
  Router.register('/booking', function(p) { return SeekerPages.renderBookingDetails(p); });
  Router.register('/favorites', function() { return SeekerPages.renderFavorites(); });
  Router.register('/chats', function() { return SeekerPages.renderChats(); });
  Router.register('/chat', function(p) { return SeekerPages.renderChat(p); });

  Router.register('/owner/dashboard', function() { return OwnerPages.renderDashboard(); });
  Router.register('/owner/listings', function() { return OwnerPages.renderListings(); });
  Router.register('/owner/add-property', function() { return OwnerPages.renderAddProperty(); });
  Router.register('/owner/edit-property', function(p) { return OwnerPages.renderEditProperty(p); });
  Router.register('/owner/bookings', function() { return OwnerPages.renderBookings(); });
  Router.register('/owner/contracts', function() { return OwnerPages.renderContracts(); });
  Router.register('/owner/payments', function() { return OwnerPages.renderPayments(); });
  Router.register('/owner/inquiries', function() { return OwnerPages.renderInquiries(); });
  Router.register('/owner/settings', function() { return SharedPages.renderSettings(); });

  Router.register('/broker/dashboard', function() { return BrokerPages.renderDashboard(); });
  Router.register('/broker/portfolio', function() { return BrokerPages.renderPortfolio(); });
  Router.register('/broker/team', function() { return BrokerPages.renderTeam(); });
  Router.register('/broker/reports', function() { return BrokerPages.renderReports(); });

  Router.register('/admin/dashboard', function() { return AdminPages.renderDashboard(); });
  Router.register('/admin/users', function() { return AdminPages.renderUsers(); });
  Router.register('/admin/kyc', function() { return AdminPages.renderKYC(); });
  Router.register('/admin/content', function() { return AdminPages.renderContent(); });
  Router.register('/admin/disputes', function() { return AdminPages.renderDisputes(); });
  Router.register('/admin/reports', function() { return AdminPages.renderReports(); });
  Router.register('/admin/settings', function() { return AdminPages.renderSettings(); });

  Router.register('/profile', function() { return SharedPages.renderProfile(); });
  Router.register('/settings', function() { return SharedPages.renderSettings(); });
  Router.register('/notifications', function() { return SharedPages.renderNotifications(); });
  Router.register('/contracts', function() { return SharedPages.renderContracts(); });
  Router.register('/payments', function() { return SharedPages.renderPayments(); });

  Router.register('/404', function() { return SharedPages.render404(); });
}

document.addEventListener('DOMContentLoaded', function() {
  registerRoutes();
  App.init();
});
