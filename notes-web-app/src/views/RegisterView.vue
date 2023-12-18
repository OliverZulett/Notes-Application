<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import type { RegisterData } from '../services/types/registerDataType'
import { register } from '@/services'
import { useUserStore, type User } from '../stores/userStore'
import router from '../router/index'
import { decodeJWT } from '../helpers/JWTdecodeHelper'

let errorMessages = ref([])

const handleSubmit = async (formValues: RegisterData) => {
  if (formValues.password !== formValues.password_confirmation) {
    errorMessages.value = ['Password and confirmation must be equal']
    return errorMessages
  } else {
    const registerResponse = await register(formValues)
    if (registerResponse?.token) {
      const store = useUserStore()
      const user: User = decodeJWT(registerResponse?.token)
      user.jwt = registerResponse?.token
      store.loadUser(user)
      localStorage.setItem('user', JSON.stringify(user));
      router.push(`/notes`)
    } else if (registerResponse?.errors) {
      errorMessages.value = registerResponse.errors
      return errorMessages
    }
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

function validateUsername(usernameValue: string) {
  if (!usernameValue) {
    return 'Username is required'
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
        <h1 class="text-6xl font-bold">Register</h1>
      </div>

      <div v-for="(errorMessage, i) in errorMessages" :key="i">
        <div role="alert" class="alert alert-error my-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </div>

      <Form class="flex flex-col justify-center items-center" @submit="handleSubmit">
        <div class="mb-5 w-full">
          <label class="mb-2 ml-2">Email:</label>
          <Field
            name="email"
            type="email"
            placeholder="user@example.com"
            class="input input-bordered input-primary w-full"
            :rules="validateEmail"
          />
          <ErrorMessage class="text-error" name="email" />
        </div>

        <div class="mb-5 w-full">
          <label class="mb-2 ml-2">Username:</label>
          <Field
            name="username"
            type="text"
            placeholder="username"
            class="input input-bordered input-primary w-full"
            :rules="validateUsername"
          />
          <ErrorMessage class="text-error" name="username" />
        </div>

        <div class="mb-5 w-full">
          <label class="mb-2 ml-2">Password:</label>
          <Field
            name="password"
            type="password"
            placeholder="********"
            class="input input-bordered input-primary w-full"
            :rules="validatePassword"
          />
          <ErrorMessage class="text-error" name="password" />
        </div>

        <div class="mb-5 w-full">
          <label class="mb-2 ml-2">Confirm Password:</label>
          <Field
            name="password_confirmation"
            type="password"
            placeholder="********"
            class="input input-bordered input-primary w-full"
            :rules="validatePassword"
          />
          <ErrorMessage class="text-error" name="password" />
        </div>

        <div class="flex mt-3">
          <button type="submit" class="btn btn-outline btn-secondary">Register</button>
          
          <router-link to="/login">
            <button class="btn btn-active btn-link">Login</button>
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
