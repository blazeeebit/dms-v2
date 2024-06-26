import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createClient } from '@supabase/supabase-js'
import * as crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const encryptionHandler = (message: string) => {
  const algorithm = 'aes-256-cbc'
  const key = crypto.scryptSync('my secret key', 'salt', 32)
  const iv = Buffer.alloc(16, 0)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(message, 'utf8', 'hex')
  return (encrypted += cipher.final('hex'))
}

export const decryptionHandler = (cipher: string) => {
  const algorithm = 'aes-256-cbc'
  const key = crypto.scryptSync('my secret key', 'salt', 32)
  const iv = Buffer.alloc(16, 0)

  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(cipher, 'hex', 'utf8')
  return (decrypted += decipher.final('utf8'))
}

export const validateUniversityURL = (url: string) => {
  return url.match(
    /https?:\/\/(.+?\.)?emu\.edu.tr(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/
  )
}

export const getMonthName = (month: number) => {
  return month == 1
    ? 'Jan'
    : month == 2
    ? 'Feb'
    : month == 3
    ? 'Mar'
    : month == 4
    ? 'Apr'
    : month == 5
    ? 'May'
    : month == 6
    ? 'Jun'
    : month == 7
    ? 'Jul'
    : month == 8
    ? 'Aug'
    : month == 9
    ? 'Sep'
    : month == 10
    ? 'Oct'
    : month == 11
    ? 'Nov'
    : month == 12 && 'Dec'
}
