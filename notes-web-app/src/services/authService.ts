import type { UserCredentials } from '@/types'
import { http, type AuthErrorResponse, type RegisterData, type TokenResponse } from '.'

const AUTH_RESOURCE = 'auth'

export function login(
  userCredentials: UserCredentials
): Promise<TokenResponse | AuthErrorResponse> {
  return http
    .post(`${AUTH_RESOURCE}/login`, JSON.stringify(userCredentials))
    .then((resp) => resp.data.data)
    .catch((error) => {
      const errors: string[] = []
      const errorsResponse = error.response.data?.errors
      const {message} = error.response.data
      if (errorsResponse?.email) {
        errorsResponse.email.forEach((error: string) => errors.push(error))
      }
      if (errorsResponse?.username) {
        errorsResponse.username.forEach((error: string) => errors.push(error))
      }
      if (message) {
        errors.push(message)
      }
      return { errors }
    })
}

export function register(registerData: RegisterData): Promise<TokenResponse | AuthErrorResponse> {
  return http
    .post(`${AUTH_RESOURCE}/register`, JSON.stringify(registerData))
    .then((resp) => resp.data.data)
    .catch((error) => {
      const errorsResponse = error.response.data.errors
      const errors: string[] = []
      if (errorsResponse?.email) {
        errorsResponse.email.forEach((error: string) => errors.push(error))
      }
      if (errorsResponse?.username) {
        errorsResponse.username.forEach((error: string) => errors.push(error))
      }
      return { errors: errors }
    })
}
