const MockData = {
  users: [
    { id: 'u1', email: 'seeker@test.com', phone: '+966501234567', password: 'Password123!', firstName: 'محمد', lastName: 'عبدالله', role: 'seeker', kycStatus: 'verified', isActive: true, avatar: null, createdAt: '2026-01-15' },
    { id: 'u2', email: 'owner@test.com', phone: '+966507654321', password: 'Password123!', firstName: 'فاطمة', lastName: 'العتيبي', role: 'owner', kycStatus: 'verified', isActive: true, avatar: null, createdAt: '2026-02-10' },
    { id: 'u3', email: 'broker@test.com', phone: '+966509876543', password: 'Password123!', firstName: 'خالد', lastName: 'المطيري', role: 'broker', kycStatus: 'verified', isActive: true, avatar: null, createdAt: '2026-01-20' },
    { id: 'u4', email: 'admin@test.com', phone: '+966501112233', password: 'Admin123!', firstName: 'إدارة', lastName: 'المنصة', role: 'admin', kycStatus: 'verified', isActive: true, avatar: null, createdAt: '2026-01-01' },
    { id: 'u5', email: 'ahmed@test.com', phone: '+966502223344', password: 'Password123!', firstName: 'أحمد', lastName: 'الشمري', role: 'seeker', kycStatus: 'pending', isActive: true, avatar: null, createdAt: '2026-03-05' },
    { id: 'u6', email: 'sara@test.com', phone: '+966503334455', password: 'Password123!', firstName: 'سارة', lastName: 'القحطاني', role: 'owner', kycStatus: 'verified', isActive: true, avatar: null, createdAt: '2026-02-20' },
    { id: 'u7', email: 'omar@test.com', phone: '+966504445566', password: 'Password123!', firstName: 'عمر', lastName: 'الحربي', role: 'seeker', kycStatus: 'rejected', isActive: true, avatar: null, createdAt: '2026-03-10' },
    { id: 'u8', email: 'nora@test.com', phone: '+966505556677', password: 'Password123!', firstName: 'نورة', lastName: 'الداهني', role: 'broker', kycStatus: 'verified', isActive: false, avatar: null, createdAt: '2026-02-15' }
  ],

  properties: [
    { id: 'p1', ownerId: 'u2', title: 'فيلا فاخرة حي النرجس', description: 'فيلا فاخرة بتصميم عصري مع حديقة خاصة ومسبح وغرفة خادمة. تتميز بموقع مميز قريب من جميع الخدمات.', propertyType: 'villa', listingType: 'sale', status: 'published', price: 2500000, areaSqm: 450, bedrooms: 5, bathrooms: 4, parking: 3, city: 'الرياض', district: 'النرجس', region: 'الرياض', latitude: 24.7136, longitude: 46.6753, amenities: ['مسبح', 'حديقة', 'غرفة خادمة', 'ملعب أطفال', 'نظام أمان'], isFeatured: true, views: 1250, favorites: 89, inquiries: 23, createdAt: '2026-01-20', images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'] },
    { id: 'p2', ownerId: 'u2', title: 'شقة أنيقة حي الملقا', description: 'شقة عصرية بإطلالة رائعة على الحديقة المركزية. تشطيبات سوبر ديلوكس مع مطبخ مجهز بالكامل.', propertyType: 'apartment', listingType: 'rent', status: 'published', price: 45000, areaSqm: 180, bedrooms: 3, bathrooms: 2, parking: 1, city: 'الرياض', district: 'الملقا', region: 'الرياض', latitude: 24.7200, longitude: 46.6800, amenities: ['مطبخ مجهز', 'مكيف مركزي', 'نادي صحي', 'أمن 24/7'], isFeatured: true, views: 890, favorites: 67, inquiries: 15, createdAt: '2026-02-05', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'] },
    { id: 'p3', ownerId: 'u6', title: 'استوديو حي العليا', description: 'استوديو مميز مناسب للأفراد أو الأزواج الجدد. موقع مركزي قريب من طريق الملك فهد.', propertyType: 'studio', listingType: 'rent', status: 'published', price: 25000, areaSqm: 65, bedrooms: 0, bathrooms: 1, parking: 1, city: 'الرياض', district: 'العليا', region: 'الرياض', latitude: 24.6877, longitude: 46.7219, amenities: ['مكيف سبليت', 'مطبخ صغير', 'بلكونة'], isFeatured: false, views: 560, favorites: 34, inquiries: 8, createdAt: '2026-02-15', images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'] },
    { id: 'p4', ownerId: 'u6', title: 'دوبلكس حي الياسمين', description: 'دوبلكس فاخر بتصميم معماري مميز. يشمل صالة معيشة واسعة ومطبخ مفتوح وحديقة خاصة.', propertyType: 'duplex', listingType: 'sale', status: 'published', price: 3200000, areaSqm: 380, bedrooms: 4, bathrooms: 3, parking: 2, city: 'الرياض', district: 'الياسمين', region: 'الرياض', latitude: 24.7300, longitude: 46.6600, amenities: ['حديقة خاصة', 'مطبخ مفتوح', 'صالة معيشة', 'غرفة سينما'], isFeatured: true, views: 1100, favorites: 76, inquiries: 19, createdAt: '2026-01-28', images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'] },
    { id: 'p5', ownerId: 'u2', title: 'مكتب تجاري حي العليا', description: 'مكتب تجاري فاخر في برج معزول. مناسب لشركات التكنولوجيا والخدمات المالية.', propertyType: 'office', listingType: 'rent', status: 'published', price: 120000, areaSqm: 250, bedrooms: 0, bathrooms: 2, parking: 4, city: 'الرياض', district: 'العليا', region: 'الرياض', latitude: 24.6880, longitude: 46.7225, amenities: ['مكيف مركزي', 'استقبال', 'غرفة اجتماعات', 'إنترنت'], isFeatured: false, views: 430, favorites: 28, inquiries: 11, createdAt: '2026-03-01', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'] },
    { id: 'p6', ownerId: 'u6', title: 'شقة عائلية حي الراكة', description: 'شقة واسعة مناسبة للعائلات الكبيرة. تتميز بالهدوء والخصوصية مع إطلالة على الحديقة.', propertyType: 'apartment', listingType: 'rent', status: 'published', price: 55000, areaSqm: 220, bedrooms: 4, bathrooms: 3, parking: 2, city: 'الرياض', district: 'الراكة', region: 'الرياض', latitude: 24.7000, longitude: 46.6900, amenities: ['مسبح مشترك', 'نادي صحي', 'حديقة', 'مكيف مركزي'], isFeatured: false, views: 720, favorites: 45, inquiries: 12, createdAt: '2026-02-25', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'] },
    { id: 'p7', ownerId: 'u2', title: 'فيلا حديثة حي العارض', description: 'فيلا بتصميم حديث مع تقنيات ذكية. نظام إنارة وتكييف آلي ونظام أمان متقدم.', propertyType: 'villa', listingType: 'sale', status: 'published', price: 4100000, areaSqm: 520, bedrooms: 6, bathrooms: 5, parking: 4, city: 'الرياض', district: 'العارض', region: 'الرياض', latitude: 24.7500, longitude: 46.6500, amenities: ['تقنية ذكية', 'مسبح', 'صالة رياضية', 'حديقة كبيرة', 'غرفة سائق'], isFeatured: true, views: 1800, favorites: 120, inquiries: 35, createdAt: '2026-01-10', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600607687644-c7f34b5e4a8e?w=800'] },
    { id: 'p8', ownerId: 'u6', title: 'شقة مفروشة حي السلامة', description: 'شقة مفروشة بالكامل جاهزة للسكن الفوري. مناسبة للمغتربين والعائلات الزائرة.', propertyType: 'apartment', listingType: 'rent', status: 'pending', price: 35000, areaSqm: 120, bedrooms: 2, bathrooms: 1, parking: 1, city: 'الرياض', district: 'السلامة', region: 'الرياض', latitude: 24.6950, longitude: 46.7100, amenities: ['مفروش بالكامل', 'مكيف', 'غسالة', 'مطبخ مجهز'], isFeatured: false, views: 340, favorites: 22, inquiries: 6, createdAt: '2026-03-08', images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'] },
    { id: 'p9', ownerId: 'u2', title: 'أرض سكنية حي النخيل', description: 'أرض سكنية في حي راقٍ. مناسبة لبناء فيلا أو مجمع سكني صغير.', propertyType: 'land', listingType: 'sale', status: 'draft', price: 1800000, areaSqm: 800, bedrooms: 0, bathrooms: 0, parking: 0, city: 'الرياض', district: 'النخيل', region: 'الرياض', latitude: 24.7200, longitude: 46.6700, amenities: [], isFeatured: false, views: 120, favorites: 8, inquiries: 3, createdAt: '2026-03-12', images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'] },
    { id: 'p10', ownerId: 'u6', title: 'بنتهاوس حي الحمراء', description: 'بنتهاوس فاخر في أعلى البرج مع إطلالة بانورامية 360 درجة على المدينة.', propertyType: 'penthouse', listingType: 'sale', status: 'published', price: 8500000, areaSqm: 600, bedrooms: 5, bathrooms: 4, parking: 3, city: 'الرياض', district: 'الحمراء', region: 'الرياض', latitude: 24.6850, longitude: 46.7150, amenities: ['إطلالة بانورامية', 'مصخاص خاص', 'مسبح سطح', 'صالة أفراح', 'خدمة كونسيرج'], isFeatured: true, views: 2200, favorites: 150, inquiries: 42, createdAt: '2026-01-05', images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'] }
  ],

  bookings: [
    { id: 'b1', propertyId: 'p2', seekerId: 'u1', ownerId: 'u2', status: 'confirmed', bookingAmount: 4500, checkInDate: '2026-04-01', checkOutDate: '2027-03-31', createdAt: '2026-03-15', escrowStatus: 'partially_released' },
    { id: 'b2', propertyId: 'p3', seekerId: 'u5', ownerId: 'u6', status: 'pending', bookingAmount: 2500, checkInDate: '2026-04-15', checkOutDate: '2027-04-14', createdAt: '2026-03-18', escrowStatus: 'pending' },
    { id: 'b3', propertyId: 'p1', seekerId: 'u1', ownerId: 'u2', status: 'completed', bookingAmount: 125000, checkInDate: '2026-01-01', checkOutDate: '2026-01-31', createdAt: '2025-12-20', escrowStatus: 'fully_released' },
    { id: 'b4', propertyId: 'p6', seekerId: 'u5', ownerId: 'u6', status: 'cancelled', bookingAmount: 5500, checkInDate: '2026-03-01', checkOutDate: '2026-12-31', createdAt: '2026-02-15', escrowStatus: 'refunded' }
  ],

  escrow: [
    { id: 'e1', bookingId: 'b1', totalAmount: 4500, releasedAmount: 1500, heldAmount: 3000, status: 'partially_released', milestones: [
      { id: 'em1', milestoneNumber: 1, amount: 1500, dueDate: '2026-04-01', status: 'released', description: 'دفعة أولى - حجز العقار' },
      { id: 'em2', milestoneNumber: 2, amount: 1500, dueDate: '2026-07-01', status: 'held', description: 'دفعة ثانية - ربع سنوي' },
      { id: 'em3', milestoneNumber: 3, amount: 1500, dueDate: '2026-10-01', status: 'pending', description: 'دفعة ثالثة - ربع سنوي' }
    ]},
    { id: 'e2', bookingId: 'b2', totalAmount: 2500, releasedAmount: 0, heldAmount: 0, status: 'pending', milestones: [] },
    { id: 'e3', bookingId: 'b3', totalAmount: 125000, releasedAmount: 125000, heldAmount: 0, status: 'fully_released', milestones: [
      { id: 'em4', milestoneNumber: 1, amount: 125000, dueDate: '2026-01-01', status: 'released', description: 'الدفعة الكاملة' }
    ]},
    { id: 'e4', bookingId: 'b4', totalAmount: 5500, releasedAmount: 0, heldAmount: 0, status: 'refunded', milestones: [] }
  ],

  contracts: [
    { id: 'c1', propertyId: 'p2', ownerId: 'u2', tenantId: 'u1', title: 'عقد إيجار شقة - الملقا', content: 'عقد إيجار سكني وفقاً لنظام الإيجار في المملكة العربية السعودية...', status: 'active', pdfUrl: '#', createdAt: '2026-03-16', signedBy: ['u1', 'u2'] },
    { id: 'c2', propertyId: 'p3', ownerId: 'u6', tenantId: 'u5', title: 'عقد إيجار استوديو - العليا', content: 'عقد إيجار سكني...', status: 'pending_signing', pdfUrl: null, createdAt: '2026-03-19', signedBy: [] },
    { id: 'c3', propertyId: 'p1', ownerId: 'u2', tenantId: 'u1', title: 'عقد بيع فيلا - النرجس', content: 'عقد بيع عقاري...', status: 'completed', pdfUrl: '#', createdAt: '2025-12-22', signedBy: ['u1', 'u2'] }
  ],

  payments: [
    { id: 'pay1', userId: 'u1', amount: 4500, paymentMethod: 'credit_card', paymentGateway: 'Moyasar', status: 'completed', invoiceId: 'inv1', bookingId: 'b1', createdAt: '2026-03-15' },
    { id: 'pay2', userId: 'u5', amount: 2500, paymentMethod: 'credit_card', paymentGateway: 'Moyasar', status: 'pending', invoiceId: 'inv2', bookingId: 'b2', createdAt: '2026-03-18' },
    { id: 'pay3', userId: 'u1', amount: 125000, paymentMethod: 'bank_transfer', paymentGateway: 'Moyasar', status: 'completed', invoiceId: 'inv3', bookingId: 'b3', createdAt: '2025-12-20' },
    { id: 'pay4', userId: 'u1', amount: 5500, paymentMethod: 'credit_card', paymentGateway: 'Moyasar', status: 'refunded', invoiceId: 'inv4', bookingId: 'b4', createdAt: '2026-02-15' }
  ],

  conversations: [
    { id: 'conv1', propertyId: 'p2', participants: ['u1', 'u2'], lastMessage: 'شكراً على التفاصيل', lastMessageAt: '2026-03-19T14:30:00', unreadCount: 1, status: 'active' },
    { id: 'conv2', propertyId: 'p3', participants: ['u5', 'u6'], lastMessage: 'هل الشقة مفروشة؟', lastMessageAt: '2026-03-19T10:15:00', unreadCount: 0, status: 'active' },
    { id: 'conv3', propertyId: 'p1', participants: ['u1', 'u2'], lastMessage: 'تم توقيع العقد بنجاح', lastMessageAt: '2026-01-05T09:00:00', unreadCount: 0, status: 'archived' }
  ],

  messages: [
    { id: 'm1', conversationId: 'conv1', senderId: 'u1', content: 'مرحباً، أinterested في شقة الملقا', messageType: 'text', isRead: true, createdAt: '2026-03-19T14:00:00' },
    { id: 'm2', conversationId: 'conv1', senderId: 'u2', content: 'أهلاً بك! الشقة متاحة والسعر قابل للتفاوض', messageType: 'text', isRead: true, createdAt: '2026-03-19T14:15:00' },
    { id: 'm3', conversationId: 'conv1', senderId: 'u1', content: 'هل يمكنني زيارة الشقة غداً؟', messageType: 'text', isRead: true, createdAt: '2026-03-19T14:20:00' },
    { id: 'm4', conversationId: 'conv1', senderId: 'u2', content: 'بالطبع، في تمام الساعة 10 صباحاً', messageType: 'text', isRead: false, createdAt: '2026-03-19T14:30:00' },
    { id: 'm5', conversationId: 'conv2', senderId: 'u5', content: 'مرحباً، هل الاستوديو مفروش بالكامل؟', messageType: 'text', isRead: true, createdAt: '2026-03-19T10:00:00' },
    { id: 'm6', conversationId: 'conv2', senderId: 'u6', content: 'نعم، مفروش بالكامل بأثاث عصري', messageType: 'text', isRead: true, createdAt: '2026-03-19T10:15:00' }
  ],

  notifications: [
    { id: 'n1', userId: 'u1', type: 'booking', title: 'تم تأكيد حجزك', message: 'تم تأكيد حجز شقة الملقا بنجاح', isRead: false, createdAt: '2026-03-15' },
    { id: 'n2', userId: 'u1', type: 'payment', title: 'تم استلام الدفعة', message: 'تم استلام الدفعة الأولى بقيمة 4,500 ريال', isRead: false, createdAt: '2026-03-15' },
    { id: 'n3', userId: 'u1', type: 'message', title: 'رسالة جديدة', message: 'فاطمة أرسلت لك رسالة جديدة', isRead: true, createdAt: '2026-03-14' },
    { id: 'n4', userId: 'u2', type: 'booking', title: 'طلب حجز جديد', message: 'محمد طلب حجز شقة الملقا', isRead: false, createdAt: '2026-03-14' },
    { id: 'n5', userId: 'u2', type: 'alert', title: 'تحديث النظام', message: 'سيتم إجراء صيانة للنظام يوم الجمعة', isRead: true, createdAt: '2026-03-10' },
    { id: 'n6', userId: 'u4', type: 'alert', title: 'طلب KYC جديد', message: 'أحمد الشمري طلب التحقق من الهوية', isRead: false, createdAt: '2026-03-12' },
    { id: 'n7', userId: 'u4', type: 'alert', title: 'نزاع جديد', message: 'نزاع مسجل على حجز #b4', isRead: false, createdAt: '2026-03-11' }
  ],

  reviews: [
    { id: 'r1', propertyId: 'p1', userId: 'u1', rating: 5, comment: 'فيلا رائعة وموقع ممتاز. المالك محترم و cooperation', createdAt: '2026-02-01' },
    { id: 'r2', propertyId: 'p2', userId: 'u1', rating: 4, comment: 'شقة جميلة لكن تحتاج تجديد بعض المعدات', createdAt: '2026-03-20' },
    { id: 'r3', propertyId: 'p7', userId: 'u5', rating: 5, comment: 'فيلا استثنائية بتصميم عصري. أنصح بها بشدة', createdAt: '2026-01-15' }
  ],

  kycRequests: [
    { id: 'k1', userId: 'u5', status: 'pending', documents: { frontId: 'id_front.jpg', backId: 'id_back.jpg', selfie: 'selfie.jpg' }, submittedAt: '2026-03-10', notes: '' },
    { id: 'k2', userId: 'u7', status: 'rejected', documents: { frontId: 'id_front.jpg', backId: 'id_back.jpg', selfie: 'selfie.jpg' }, submittedAt: '2026-03-05', notes: 'الصورة غير واضحة' }
  ],

  disputes: [
    { id: 'd1', bookingId: 'b4', complainantId: 'u5', respondentId: 'u6', reason: 'إلغاء الحجز وعدم استرداد المبلغ', status: 'open', createdAt: '2026-03-11', evidence: [] },
    { id: 'd2', bookingId: 'b3', complainantId: 'u1', respondentId: 'u2', reason: 'تأخر في تسليم المفاتيح', status: 'resolved', resolution: 'تم حل المشكلة بتوصل الطرفين', createdAt: '2025-12-25', resolvedAt: '2025-12-28', evidence: [] }
  ],

  inquiries: [
    { id: 'in1', propertyId: 'p2', seekerId: 'u1', message: 'هل السعر قابل للتفاوض؟', status: 'replied', createdAt: '2026-03-14', reply: 'نعم، السعر قابل للتفاوض' },
    { id: 'in2', propertyId: 'p7', seekerId: 'u5', message: 'هل يوجد صور إضافية للفيلا؟', status: 'pending', createdAt: '2026-03-18', reply: null },
    { id: 'in3', propertyId: 'p1', seekerId: 'u1', message: 'ما هي مساحة الحديقة؟', status: 'replied', createdAt: '2026-03-12', reply: 'الحديقة بمساحة 200 متر مربع' }
  ],

  teamMembers: [
    { id: 'tm1', brokerId: 'u3', name: 'خالد المطيري', email: 'khalid@test.com', role: 'agent', propertiesCount: 15, status: 'active', joinedAt: '2026-01-20' },
    { id: 'tm2', brokerId: 'u3', name: 'عبدالرحمن السالم', email: 'abdulrahman@test.com', role: 'agent', propertiesCount: 8, status: 'active', joinedAt: '2026-02-01' },
    { id: 'tm3', brokerId: 'u3', name: 'منال الفهد', email: 'manal@test.com', role: 'assistant', propertiesCount: 0, status: 'active', joinedAt: '2026-02-15' }
  ],

  savedSearches: [
    { id: 'ss1', userId: 'u1', name: 'شقق في العليا', filters: { propertyType: 'apartment', district: 'العليا', maxPrice: 60000 }, createdAt: '2026-03-10' },
    { id: 'ss2', userId: 'u1', name: 'فلل للبيع في النرجس', filters: { propertyType: 'villa', listingType: 'sale', district: 'النرجس' }, createdAt: '2026-03-05' }
  ],

  favorites: [
    { userId: 'u1', propertyId: 'p2', createdAt: '2026-03-01' },
    { userId: 'u1', propertyId: 'p7', createdAt: '2026-03-02' },
    { userId: 'u5', propertyId: 'p1', createdAt: '2026-03-10' }
  ]
};

function getPropertyById(id) {
  return MockData.properties.find(p => p.id === id);
}

function getUserById(id) {
  return MockData.users.find(u => u.id === id);
}

function getPropertiesByOwner(ownerId) {
  return MockData.properties.filter(p => p.ownerId === ownerId);
}

function getBookingsByUser(userId) {
  return MockData.bookings.filter(b => b.seekerId === userId || b.ownerId === userId);
}

function getConversationsByUser(userId) {
  return MockData.conversations.filter(c => c.participants.includes(userId));
}

function getMessagesByConversation(convId) {
  return MockData.messages.filter(m => m.conversationId === convId);
}

function getNotificationsByUser(userId) {
  return MockData.notifications.filter(n => n.userId === userId);
}

function getUnreadNotificationsCount(userId) {
  return MockData.notifications.filter(n => n.userId === userId && !n.isRead).length;
}

function getUnreadMessagesCount(userId) {
  const convs = getConversationsByUser(userId);
  return convs.reduce((sum, c) => sum + c.unreadCount, 0);
}

function getFavoritesByUser(userId) {
  return MockData.favorites.filter(f => f.userId === userId).map(f => getPropertyById(f.propertyId));
}

function searchProperties(query, filters = {}) {
  let results = MockData.properties.filter(p => p.status === 'published');

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q)
    );
  }

  if (filters.propertyType) {
    results = results.filter(p => p.propertyType === filters.propertyType);
  }
  if (filters.listingType) {
    results = results.filter(p => p.listingType === filters.listingType);
  }
  if (filters.minPrice) {
    results = results.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    results = results.filter(p => p.price <= filters.maxPrice);
  }
  if (filters.bedrooms !== undefined && filters.bedrooms !== '') {
    results = results.filter(p => p.bedrooms === parseInt(filters.bedrooms));
  }
  if (filters.city) {
    results = results.filter(p => p.city === filters.city);
  }
  if (filters.district) {
    results = results.filter(p => p.district === filters.district);
  }

  return results;
}

function formatPrice(price, type = 'rent') {
  return new Intl.NumberFormat('ar-SA').format(price) + ' ريال';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getStatusLabel(status) {
  const labels = {
    'published': 'منشور', 'pending': 'قيد المراجعة', 'draft': 'مسودة', 'rejected': 'مرفوض', 'expired': 'منتهي',
    'reserved': 'محجوز', 'booked': 'محجوز', 'completed': 'مكتمل', 'sold': 'مباع', 'rented': 'مؤجر',
    'confirmed': 'مؤكد', 'cancelled': 'ملغي',
    'active': 'نشط', 'inactive': 'غير نشط',
    'verified': 'موثق', 'unverified': 'غير موثق',
    'partially_released': 'تم الإفراج جزئياً', 'fully_released': 'تم الإفراج بالكامل', 'refunded': 'مسترد',
    'open': 'مفتوح', 'resolved': 'محلول',
    'replied': 'تم الرد',
    'processing': 'قيد المعالجة', 'failed': 'فشل'
  };
  return labels[status] || status;
}

function getStatusBadgeClass(status) {
  const classes = {
    'published': 'badge-success', 'pending': 'badge-warning', 'draft': 'badge-neutral', 'rejected': 'badge-error',
    'confirmed': 'badge-success', 'cancelled': 'badge-error', 'completed': 'badge-success', 'active': 'badge-success',
    'verified': 'badge-success', 'unverified': 'badge-warning', 'pending_signing': 'badge-warning',
    'partially_released': 'badge-warning', 'fully_released': 'badge-success', 'refunded': 'badge-info',
    'open': 'badge-error', 'resolved': 'badge-success', 'replied': 'badge-success',
    'processing': 'badge-warning', 'failed': 'badge-error', 'inactive': 'badge-neutral'
  };
  return classes[status] || 'badge-neutral';
}

function getPropertyTypeLabel(type) {
  const labels = { 'villa': 'فيلا', 'apartment': 'شقة', 'studio': 'استوديو', 'duplex': 'دوبلكس', 'office': 'مكتب', 'land': 'أرض', 'penthouse': 'بنتهاوس' };
  return labels[type] || type;
}

function getListingTypeLabel(type) {
  return type === 'sale' ? 'للبيع' : 'للإيجار';
}

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
