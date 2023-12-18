<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { decodeJWT } from '@/helpers'
import { login } from '@/services'
import { useUserStore, type User } from '@/stores'
import type { UserCredentials } from '@/types'
import { ref } from 'vue'
import router from '../router/index'

let errorMessages = ref([])

const handleSubmit = async (formValues: UserCredentials) => {
  const loginResponse = await login(formValues)
  if (loginResponse?.token) {
    const store = useUserStore()
    const user: User = decodeJWT(loginResponse?.token)
    user.jwt = loginResponse?.token
    store.loadUser(user)
    localStorage.setItem('user', JSON.stringify(user));
    router.push(`/notes`)
  } else if (loginResponse?.errors) {
    errorMessages.value = loginResponse.errors
    return errorMessages
  }
  errorMessages.value = []
}

function validateEmail(emailValue: string) {
  if (!emailValue) {
    return 'Email is required'
  }
  const emailRegexValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!emailRegexValidation.test(emailValue)) {
    return 'Email must be valid'
  }
  return true
}

function validatePassword(passwordValue: string) {
  if (!passwordValue) {
    return 'Password is required'
  }
  if (passwordValue.length < 8) {
    return 'Password should have at least 8 characters'
  }
  return true
}
</script>

<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div>
      <div class="flex justify-center mb-10">
        <h1 class="text-6xl font-bold">Notes App</h1>
      </div>

      <div v-for="(errorMessage, i) in errorMessages" :key="i">
        <div role="alert" class="alert alert-error my-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </div>

      <Form @submit="handleSubmit" class="flex flex-col justify-center items-center">
        <div class="mb-5 w-full">
          <label class="mb-2 ml-2">Email:</label>
          <Field name="email" type="email" placeholder="user@example.com"
            class="input input-bordered input-primary w-full" :rules="validateEmail" />
          <ErrorMessage class="text-error" name="email" />
        </div>

        <div class="mb-5 w-full">
          <label class="mb-2 ml-2">Password:</label>
          <Field name="password" type="password" placeholder="********" class="input input-bordered input-primary w-full"
            :rules="validatePassword" />
          <ErrorMessage class="text-error" name="password" />
        </div>

        <div class="flex">
          <button type="submit" class="btn btn-outline btn-secondary">Login</button>
          <router-link to="/register">
            <button class="btn btn-active btn-link">Register</button>
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
