<script setup lang="ts">
import { getNotesByUserId } from '../services/notesService'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import Note from '@/components/Note.vue';

let notes = ref([])
const store = useUserStore()
const { userId, jwt } = storeToRefs(store)

if (userId?.value && jwt?.value) {
  notes.value = await getNotesByUserId(userId.value, jwt.value);
} else {
  notes.value = []
}
</script>

<template>
  <div class="container mx-auto my-5">
    <div class="flex flex-col justify-left mb-10 px-3">
      <h1 class="text-6xl font-bold">My notes</h1>
      <p v-if="notes.length === 0" class="mt-8 text-2xl font-light">You dont have notes yet, why you dont create a new one? press the + button</p>
    </div>

    <div class="flex flex-wrap px-3">
      <div class="p-1 w-full sm:w-6/12 md:w-4/12 lg:w-3/12" v-for="(note, i) in notes" :key="i">
        <router-link :to="{ name: 'note', params: { noteId: note.id } }">
          <Note :note="note" />
        </router-link>
      </div>
    </div>
  </div>

  <div class="fixed bottom-[5%] right-[20px]">
    <router-link class="btn btn-secondary btn-lg btn-circle" to="/new-note">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </router-link>
  </div>
</template>
