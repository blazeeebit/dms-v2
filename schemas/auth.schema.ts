import { ZodType, z } from 'zod'

export type SignUpUserProps = {
  email: string
  password: string
  confirmPassword: string
  name: string
  username: string
  role: 'OWNER' | 'STUDENT'
  otp: string
}

export type SignInUserProps = {
  email: string
  password: string
}

export type CompleteOnBoardingProps = {
  role: 'OWNER' | 'STUDENT'
}

export const SignUpUserSchema: ZodType<SignUpUserProps> = z
  .object({
    email: z.string().email({ message: 'Your email is not valid' }),
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
    name: z
      .string()
      .min(4, { message: 'your full name must be atleast 4 characters long' }),
    username: z
      .string()
      .min(3, { message: 'Your username must be atleast 3 characters' }),
    role: z.enum(['OWNER', 'STUDENT']),
    otp: z
      .string()
      .min(6, { message: 'OTP must be atleast 6 characters long' }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })

export const CompleteOnBoardingSchema: ZodType<CompleteOnBoardingProps> =
  z.object({
    role: z.enum(['OWNER', 'STUDENT']),
  })

export const SignInUser: ZodType<SignInUserProps> = z.object({
  email: z.string().email({ message: 'Email format is not valid' }),
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
})
