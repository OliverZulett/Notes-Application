import type { UserCredentials } from '@/types'

export type RegisterData = {
  username: string
  password_confirmation: string
} & UserCredentials
