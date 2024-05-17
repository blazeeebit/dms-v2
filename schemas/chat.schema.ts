import { z } from 'zod'

export type chatMessageProps = {
  message: string
  senderId: string
  recieverId: string
}

export const chatMessageSchema = z.object({
  message: z.string().min(1),
  senderId: z.string().min(1),
  recieverId: z.string().min(1),
})
