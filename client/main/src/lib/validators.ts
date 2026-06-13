import { z } from 'zod'

export const firstVisitFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  birthDate: z.string().min(1, 'Birth date is required'),
  maritalStatus: z.enum(['Married', 'Unmarried']),
  anniversaryDate: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'RatherNotSay']),
  stars: z.number().min(1, 'Please rate your experience').max(5),
  reviewText: z.string().max(1000).optional(),
}).superRefine((data, ctx) => {
  if (data.maritalStatus === 'Married' && !data.anniversaryDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Anniversary date is required',
      path: ['anniversaryDate'],
    })
  }
})

export const ongoingReviewSchema = z.object({
  stars: z.number().min(1, 'Please rate your experience').max(5),
  reviewText: z.string().max(1000).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export type FirstVisitFormData = z.infer<typeof firstVisitFormSchema>
export type OngoingReviewData = z.infer<typeof ongoingReviewSchema>
export type LoginFormData = z.infer<typeof loginSchema>
