import { z } from 'zod'

type ListingServiceProps = {
  id: string
  name: string
}

export type CreateDormListingProps = {
  name: string
  thumbnail: any
  price: string
  services: ListingServiceProps[]
  description: string
}

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

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
  price: z.string(),
  services: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  description: z
    .string()
    .min(100, { message: 'The description must be at least 100 characters' })
    .max(1000, {
      message: 'Description must not be more then 1000 characters',
    }),
})
