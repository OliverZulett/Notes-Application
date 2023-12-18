import type { UserCredentials } from './UserCredentialsType'

export type UserCredentialRegistration = {
  confirmPassword: string
} & UserCredentials
