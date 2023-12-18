<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { createNote } from '../services/notesService';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import router from '../router/index';

const store = useUserStore()
const { userId, jwt } = storeToRefs(store)

const handleSubmit = async (formValues: any) => {
  const note = {
    ...formValues,
    user_id: userId.value
  }
  if (jwt?.value) {
    await createNote(note, jwt.value);
    router.push(`/notes`)
  }
}

function validateTitle(titleValue: string) {
  if (!titleValue) {
    return 'Title is required'
  }
  return true
}

</script>
<template>
  <div class="container mx-auto my-5">
    <div class="flex items-center justify-left mb-10">
      <router-link to="/notes">
        <button class="btn btn-circle btn-outline text-3xl mr-4">
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </button>
      </router-link>
      <h1 class="text-6xl font-bold">New Note</h1>
    </div>
    <div>
      <Form @submit="handleSubmit" class="flex flex-col justify-center items-center">
        <div class="mb-5 w-full">
          <label for="title">Title</label>
          <Field name="title" type="text" placeholder="Note Title" :rules="validateTitle"
            class="input input-bordered input-primary w-full" />
          <ErrorMessage class="text-error" name="title" />
        </div>
        <div class="mb-5 w-full">
          <label for="content">Content</label>
          <Field name="content" type="text" as="textarea" placeholder="Note Content"
            class="input input-bordered input-primary w-full h-36" />
        </div>
        <div class="mb-5 w-full">
          <button type="submit" class="btn btn-outline btn-secondary">Create</button>
        </div>
      </Form>
    </div>
  </div>
</template>
