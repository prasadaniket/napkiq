export type Gender = 'Male' | 'Female' | 'RatherNotSay'
export type MaritalStatus = 'Married' | 'Unmarried'

export interface Customer {
  id: string
  deviceId: string
  fullName: string
  phone: string
  email: string | null
  birthDate: string
  anniversaryDate: string | null
  gender: Gender
  maritalStatus: MaritalStatus
  firstVisitOutletId: string | null
  lastVisitDate: string | null
  totalVisits: number
  hasSubmittedFirstReview: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateCustomerRequest {
  deviceId: string
  fullName: string
  phone: string
  email?: string
  birthDate: string
  anniversaryDate?: string
  gender: Gender
  maritalStatus: MaritalStatus
  firstVisitOutletId: string
}
