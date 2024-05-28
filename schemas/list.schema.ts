import { z } from 'zod'

type ListingServiceProps = {
  name: string
  icon: string
}

export type CreateDormListingProps = {
  name: string
  thumbnail: any
  services: ListingServiceProps[]
  description: string
}

export type EditDormContentProps = {
  name?: string
  description?: string
}

export type CreateDormRoomPlanProps = {
  price: string
  room: string
}

export type CreateReservationButtonProps = {
  price: string
  period: Date
}

export type CreateBookingButtonStudentProps = {
  room: string
}

export type CreateDormReviewProps = {
  review: string
}

export type CreatePromosProps = {
  name: string
  discount: string
}

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

export const CreateDormListingSchema = z.object({
  name: z
    .string()
    .min(6, { message: 'The name must be atleast 6 characters long' })
    .max(36, { message: 'The name cannot be longer then 36 characters' }),
  thumbnail: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'Your file size must be less then 2MB',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'Only JPG, JPEG & PNG are accepted file formats',
    }),
  services: z
    .array(
      z.object({
        name: z.string(),
        icon: z.string(),
      })
    )
    .refine(
      (services) => {
        if (services.length > 0) {
          return true
        } else {
          return false
        }
      },
      { message: 'You must pick atleast on service' }
    ),
  description: z
    .string()
    .min(100, { message: 'The description must be at least 100 characters' })
    .max(1000, {
      message: 'Description must not be more then 1000 characters',
    }),
})

export const EditDormContentSchema = z.object({
  name: z.string().min(1, { message: 'You must add a new title' }).optional(),
  description: z
    .string()
    .min(100, {
      message: 'You must add a new description of atleast 100 words',
    })
    .optional(),
  price: z.string().min(1, { message: 'You must add a new price' }).optional(),
})

export const CreateDormRoomPlanSchema = z.object({
  price: z.string().min(1, { message: 'You must enter a valid price' }),
  room: z.string().min(1, { message: 'You must select a room' }),
})

export const CreateBookingButtonSchema = z.object({
  price: z.string().min(1, { message: 'You must enter a valid price' }),
  period: z.coerce.date(),
})

export const CreateBookingButtonStudentSchema = z.object({
  room: z.string().min(1, { message: 'You must pick a room' }),
})

export const CreateDormReviewSchema = z.object({
  review: z.string().min(1, { message: 'Your review must not be empty' }),
})

export const CreatePromosSchema = z.object({
  name: z
    .string()
    .min(6, { message: 'You must provide a 6 digit code for your promo' }),
  discount: z
    .string()
    .min(1, { message: 'You must a discount percentage amount' }),
})
