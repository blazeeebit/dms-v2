import { z } from 'zod'

export type ProfileUpdateSettingsProps = {
  image?: any
  fullname?: string
  username?: string
  address?: string
  country?: string
  phone?: string
}

export type StudentProfileSettingsUpdateProps = {
  department?: string
  studentId?: string
}

export type UpdateUserPasswordProps = {
  password: string
  confirmPassword: string
}

export const ProfileUpdateSettingsSchema = z.object({
  image: z.any().optional(),
  fullname: z
    .string()
    .min(1, { message: 'You must write atleast 3 characters' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  username: z
    .string()
    .min(1, { message: 'You must write atleast 3 characters' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  address: z
    .string()
    .min(1, { message: 'You must write atleast 5 characters' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  country: z
    .string()
    .min(1, { message: 'You must choose a valid country' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  phone: z
    .string()
    .min(1, { message: 'You must choose a valid phone number' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
})

export const StudentProfileSettingsUpdateSchema = z.object({
  department: z
    .string()
    .min(1, { message: 'You must choose a department' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  studentId: z
    .string()
    .min(6, { message: 'You must enter a valid student Id' })
    .optional()
    .or(z.literal('').transform(() => undefined)),
})

export const UpdateUserPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })
