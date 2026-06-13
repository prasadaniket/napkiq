// Mock API — returns static data when NEXT_PUBLIC_MOCK_API=true

import type { DashboardStats, LoginResponse, PageResponse } from '@/types/api'
import type { Customer } from '@/types/customer'
import type { Outlet } from '@/types/outlet'
import type { Review } from '@/types/review'
import type { MenuItem } from '@/types/menu'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// ── Outlets ──────────────────────────────────────────────────────────────────

const MOCK_OUTLETS: Outlet[] = [
  {
    id: 'outlet-001', code: 'BSR', slug: 'boisar',
    name: 'Napkiq Boisar', location: 'Boisar, Palghar',
    address: 'Shop 4, Mahavir Complex, Station Road, Boisar, Palghar 401501',
    googlePlaceId: 'ChIJ_boisar_place_id',
    googleMapsUrl: 'https://maps.google.com',
    instagramUrl: 'https://www.instagram.com/citrinefinedineofficial',
    facebookUrl: 'https://facebook.com/napkiq',
    isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'outlet-002', code: 'PLG', slug: 'palghar',
    name: 'Napkiq Palghar', location: 'Palghar, Maharashtra',
    address: 'Shop 12, Sai Complex, Manor Road, Palghar 401404',
    googlePlaceId: 'ChIJ_palghar_place_id',
    googleMapsUrl: 'https://maps.google.com',
    instagramUrl: 'https://instagram.com/napkiq',
    facebookUrl: null,
    isActive: true, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'outlet-003', code: 'VIR', slug: 'virar',
    name: 'Napkiq Virar', location: 'Virar West, Palghar',
    address: 'Unit 7, Lotus Mall, Virar West, Palghar 401303',
    googlePlaceId: 'ChIJ_virar_place_id',
    googleMapsUrl: 'https://maps.google.com',
    instagramUrl: 'https://instagram.com/napkiq',
    facebookUrl: 'https://facebook.com/napkiq',
    isActive: true, createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'outlet-004', code: 'VSI', slug: 'vasai',
    name: 'Napkiq Vasai', location: 'Vasai West, Palghar',
    address: 'Shop 3, Riddhi Plaza, Vasai West, Palghar 401202',
    googlePlaceId: 'ChIJ_vasai_place_id',
    googleMapsUrl: 'https://maps.google.com',
    instagramUrl: null,
    facebookUrl: 'https://facebook.com/napkiq',
    isActive: true, createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z',
  },
]

// ── Customers ─────────────────────────────────────────────────────────────────

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001', deviceId: 'dev-001', fullName: 'Riya Sharma', phone: '9876543210',
    email: 'riya@example.com', birthDate: '1995-03-15', anniversaryDate: '2020-11-20',
    gender: 'Female', maritalStatus: 'Married', firstVisitOutletId: 'outlet-001',
    lastVisitDate: '2026-04-10', totalVisits: 12, hasSubmittedFirstReview: true,
    createdAt: '2024-06-01T10:00:00Z', updatedAt: '2026-04-10T18:00:00Z',
  },
  {
    id: 'cust-002', deviceId: 'dev-002', fullName: 'Arjun Mehta', phone: '9123456780',
    email: null, birthDate: '1990-07-22', anniversaryDate: null,
    gender: 'Male', maritalStatus: 'Unmarried', firstVisitOutletId: 'outlet-002',
    lastVisitDate: '2026-03-28', totalVisits: 5, hasSubmittedFirstReview: true,
    createdAt: '2024-09-15T09:00:00Z', updatedAt: '2026-03-28T20:00:00Z',
  },
  {
    id: 'cust-003', deviceId: 'dev-003', fullName: 'Priya Nair', phone: '9988776655',
    email: 'priya@example.com', birthDate: '1998-12-05', anniversaryDate: null,
    gender: 'Female', maritalStatus: 'Unmarried', firstVisitOutletId: 'outlet-003',
    lastVisitDate: '2026-04-18', totalVisits: 3, hasSubmittedFirstReview: false,
    createdAt: '2026-01-20T11:00:00Z', updatedAt: '2026-04-18T19:30:00Z',
  },
  {
    id: 'cust-004', deviceId: 'dev-004', fullName: 'Rohit Patil', phone: '9765432109',
    email: null, birthDate: '1993-08-10', anniversaryDate: '2019-02-14',
    gender: 'Male', maritalStatus: 'Married', firstVisitOutletId: 'outlet-004',
    lastVisitDate: '2026-04-15', totalVisits: 8, hasSubmittedFirstReview: true,
    createdAt: '2025-02-10T10:00:00Z', updatedAt: '2026-04-15T20:00:00Z',
  },
]

// ── Reviews ───────────────────────────────────────────────────────────────────

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-001', customerId: 'cust-001', customerName: 'Riya Sharma',
    outletId: 'outlet-001', outletName: 'Napkiq Boisar',
    reviewText: 'Amazing pizza! The crust was perfectly crispy and the toppings were generous. Will definitely come back.',
    stars: 5, reviewType: 'first_visit', postedToGoogle: true, isVisible: true,
    createdAt: '2024-06-02T12:00:00Z',
  },
  {
    id: 'rev-002', customerId: 'cust-002', customerName: 'Arjun Mehta',
    outletId: 'outlet-002', outletName: 'Napkiq Palghar',
    reviewText: 'Good food but service could be faster.',
    stars: 4, reviewType: 'repeat', postedToGoogle: false, isVisible: true,
    createdAt: '2026-03-28T21:00:00Z',
  },
  {
    id: 'rev-003', customerId: 'cust-004', customerName: 'Rohit Patil',
    outletId: 'outlet-004', outletName: 'Napkiq Vasai',
    reviewText: 'Loved the pasta here. Cozy ambience and friendly staff.',
    stars: 5, reviewType: 'first_visit', postedToGoogle: true, isVisible: true,
    createdAt: '2025-02-11T13:00:00Z',
  },
]

// ── Menu ──────────────────────────────────────────────────────────────────────

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-001', categoryId: 'cat-001',
    category: { id: 'cat-001', name: 'Pizzas', displayOrder: 1, isActive: true },
    name: 'Margherita', description: 'Classic tomato base, mozzarella, fresh basil',
    price: 299, priceVariants: { Regular: 299, Large: 449 }, isVeg: true,
    imageUrl: null, isAvailable: true, displayOrder: 1,
  },
  {
    id: 'item-002', categoryId: 'cat-001',
    category: { id: 'cat-001', name: 'Pizzas', displayOrder: 1, isActive: true },
    name: 'BBQ Chicken', description: 'Smoky BBQ sauce, grilled chicken, caramelised onion',
    price: 399, priceVariants: { Regular: 399, Large: 549 }, isVeg: false,
    imageUrl: null, isAvailable: true, displayOrder: 2,
  },
  {
    id: 'item-003', categoryId: 'cat-002',
    category: { id: 'cat-002', name: 'Pastas', displayOrder: 2, isActive: true },
    name: 'Penne Arrabbiata', description: 'Spicy tomato sauce, garlic, fresh chilli',
    price: 249, priceVariants: null, isVeg: true,
    imageUrl: null, isAvailable: true, displayOrder: 1,
  },
  {
    id: 'item-004', categoryId: 'cat-003',
    category: { id: 'cat-003', name: 'Beverages', displayOrder: 3, isActive: true },
    name: 'Fresh Lime Soda', description: null, price: 89, priceVariants: null,
    isVeg: true, imageUrl: null, isAvailable: true, displayOrder: 1,
  },
]

// ── Dashboard ─────────────────────────────────────────────────────────────────

const MOCK_DASHBOARD: DashboardStats = {
  totalCustomers: 412, totalReviews: 298, totalVisits: 1540, inactiveCustomers: 58,
  averageRating: 4.4, birthdaysThisMonth: 11, anniversariesThisMonth: 6,
  newCustomersThisWeek: 18, newReviewsThisWeek: 14,
  outletStats: [
    { outletCode: 'BSR', outletName: 'Boisar', customers: 105, reviews: 76, visits: 390, avgRating: 4.5, inactiveCustomers: 14 },
    { outletCode: 'PLG', outletName: 'Palghar', customers: 98, reviews: 72, visits: 362, avgRating: 4.3, inactiveCustomers: 15 },
    { outletCode: 'VIR', outletName: 'Virar', customers: 112, reviews: 81, visits: 418, avgRating: 4.4, inactiveCustomers: 16 },
    { outletCode: 'VSI', outletName: 'Vasai', customers: 97, reviews: 69, visits: 370, avgRating: 4.3, inactiveCustomers: 13 },
  ],
}

// ── Auth ──────────────────────────────────────────────────────────────────────

const MOCK_LOGIN: LoginResponse = {
  token: 'mock-jwt-token-dev-only',
  userId: 'user-001',
  fullName: 'Demo Admin',
  email: 'admin@napkiq.in',
  role: 'main_owner',
  assignedOutletId: null,
  assignedOutletName: null,
}

// ── Automation logs ───────────────────────────────────────────────────────────

const MOCK_AUTOMATION_LOGS = [
  { id: 'log-001', customer: { fullName: 'Riya Sharma', phone: '9876543210' }, automationType: 'birthday_whatsapp', messageStage: 'on_day', status: 'success', sentAt: '2026-04-15T08:00:00Z', errorMessage: null },
  { id: 'log-002', customer: { fullName: 'Arjun Mehta', phone: '9123456780' }, automationType: 'reengagement_whatsapp', messageStage: 'thirty_days_inactive', status: 'success', sentAt: '2026-04-17T09:30:00Z', errorMessage: null },
  { id: 'log-003', customer: { fullName: 'Priya Nair', phone: '9988776655' }, automationType: 'anniversary_whatsapp', messageStage: 'five_days_before', status: 'failed', sentAt: '2026-04-18T10:00:00Z', errorMessage: 'Twilio: Invalid number' },
]

// ── Router ────────────────────────────────────────────────────────────────────

function mockGet(url: string): unknown {
  const path = url.split('?')[0]

  if (path === '/cms/dashboard/stats') return MOCK_DASHBOARD

  if (path.startsWith('/cms/customers')) {
    if (path.match(/\/cms\/customers\/[^/]+$/)) {
      const id = path.split('/').pop()
      return MOCK_CUSTOMERS.find((c) => c.id === id) ?? MOCK_CUSTOMERS[0]
    }
    const page: PageResponse<Customer> = {
      content: MOCK_CUSTOMERS, totalElements: MOCK_CUSTOMERS.length,
      totalPages: 1, size: 20, number: 0, first: true, last: true,
    }
    return page
  }

  if (path === '/cms/reviews') {
    const page: PageResponse<Review> = {
      content: MOCK_REVIEWS, totalElements: MOCK_REVIEWS.length,
      totalPages: 1, size: 20, number: 0, first: true, last: true,
    }
    return page
  }

  if (path.startsWith('/cms/automation-logs')) {
    const page: PageResponse<(typeof MOCK_AUTOMATION_LOGS)[0]> = {
      content: MOCK_AUTOMATION_LOGS, totalElements: MOCK_AUTOMATION_LOGS.length,
      totalPages: 1, size: 50, number: 0, first: true, last: true,
    }
    return page
  }

  if (path.startsWith('/customers/by-device/')) return MOCK_CUSTOMERS[0]

  if (path === '/outlets') return MOCK_OUTLETS

  if (path.startsWith('/outlets/')) {
    const code = path.split('/').pop()?.toUpperCase()
    return MOCK_OUTLETS.find((o) => o.code === code) ?? MOCK_OUTLETS[0]
  }

  if (path.startsWith('/menu/outlet/')) return MOCK_MENU_ITEMS

  if (path.startsWith('/cms/export/')) {
    return new Blob(['Name,Phone\nRiya Sharma,9876543210'], { type: 'text/csv' })
  }

  return null
}

// ── Mock api object ───────────────────────────────────────────────────────────

export const mockApi = {
  get: async <T>(url: string, _config?: { responseType?: string }) => {
    await delay()
    return { data: mockGet(url) as T }
  },
  post: async <T>(url: string, _body?: unknown) => {
    await delay()
    if (url === '/auth/login') return { data: MOCK_LOGIN as T }
    return { data: {} as T }
  },
}
