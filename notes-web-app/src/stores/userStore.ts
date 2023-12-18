import { defineStore } from 'pinia'

export type User = {
  username: string | undefined
  email: string | undefined
  userId: string | undefined
  jwt?: string | undefined
}

export const useUserStore = defineStore('user', {
  state: () =>
    <User>{
      userId: undefined,
      username: undefined,
      email: undefined,
      jwt: undefined
    },
  getters: {
    getLoggedUSer: (state) => state
  },
  actions: {
    loadUser(user: User) {
      this.userId = user.userId
      this.username = user.username
      this.email = user.email
      this.jwt = user.jwt
    }
  }
})
