export interface ApiError {
  status: number
  message: string
  timestamp: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export interface LoginResponse {
  token: string
  refreshToken?: string
  userId: string
  username: string | null
  fullName: string
  email: string
  role: 'admin' | 'owner' | 'franchise_owner'
  assignedOutletId: string | null
  assignedOutletName: string | null
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalCustomers:        number
  totalReviews:          number
  totalVisits:           number
  averageRating:         number | null
  inactiveCustomers:     number
  newCustomersThisWeek:  number
  newCustomersThisMonth: number
  newCustomersThisYear:  number
  newReviewsThisWeek:    number
  totalVisitsThisMonth:  number
  totalVisitsThisYear:   number
  birthdaysThisMonth:    number
  anniversariesThisMonth:number
}

// ─── Outlets ──────────────────────────────────────────────────────────────────

export interface Outlet {
  id:            string
  name:          string
  code:          string
  slug:          string
  address:       string | null
  googleMapsUrl: string | null
  isActive:      boolean
}

export interface OutletDetail {
  outlet: Outlet
  stats: OutletStats & { starDistribution: { stars: number; count: number }[] }
  recentCustomers: {
    id: string; fullName: string; phone: string
    totalVisits: number; lastVisitDate: string | null; createdAt: string
  }[]
  recentReviews: (Review & { customer?: { fullName: string; phone: string } })[]
  recentVisits:  { id: string; visitType: 'qr_scan' | 'payment'; visitedAt: string; customer?: { fullName: string; phone: string } }[]
}

export interface OutletStats {
  outletId:               string
  outletName:             string
  outletCode:             string
  outletSlug:             string
  googleMapsUrl:          string | null
  totalCustomers:         number
  totalReviews:           number
  totalVisits:            number
  averageRating:          number | null
  inactiveCustomers:      number
  newCustomersThisWeek:   number
  newCustomersThisMonth:  number
  newCustomersThisYear:   number
  reviewsThisWeek:        number
  visitsThisMonth:        number
  birthdaysThisMonth:     number
  anniversariesThisMonth: number
}

// ─── Customers ────────────────────────────────────────────────────────────────

export interface Customer {
  id:                      string
  fullName:                string
  phone:                   string
  email:                   string | null
  gender:                  string
  maritalStatus:           string
  birthDate:               string | null
  anniversaryDate:         string | null
  totalVisits:             number
  lastVisitDate:           string | null
  hasSubmittedFirstReview: boolean
  firstVisitOutletId:      string
  createdAt:               string
  firstVisitOutlet?:       { name: string; code: string }
  // Only present on the single-customer /:id endpoint
  visits?:                 { id: string; visitType: 'qr_scan' | 'payment'; visitedAt: string; outlet?: { name: string; code: string } }[]
  reviews?:                Review[]
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface Review {
  id:           string
  stars:        number
  reviewType:   'first_visit' | 'repeat'
  comment:      string | null
  createdAt:    string
  customerId:   string
  outletId:     string
  customer?:    { fullName: string; phone: string }
  outlet?:      { name: string; code: string; googleMapsUrl: string | null }
}

export interface ReviewSummary {
  averageRating: number | null
  totalReviews:  number
  distribution:  { stars: number; count: number }[]
}

// ─── Visits ───────────────────────────────────────────────────────────────────

export interface Visit {
  id:          string
  visitType:   'qr_scan' | 'payment'
  visitedAt:   string
  customerId:  string
  outletId:    string
  customer?:   { fullName: string; phone: string }
  outlet?:     { name: string; code: string }
}
