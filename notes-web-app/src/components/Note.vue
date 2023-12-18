<script setup lang="ts">
import { type Note } from '../services/types/noteResponseType'
import moment from 'moment'

const props = defineProps<{
  note: Note
}>()

const {updated_at} = props.note;

</script>

<template>
  <div
    class="card bg-neutral text-neutral-content hover:bg-secondary hover:text-secondary-content cursor-pointer ease-in-out duration-300">
    <div class="card-body">
      <div class="flex">
        <h2 class="card-title whitespace-pre-wrap line-clamp-2 my-3 capitalize">
          {{ props.note.title }}
        </h2>
      </div>
      <p class="whitespace-pre-wrap line-clamp-3">{{ props.note.content }}</p>
      <p class="flex justify-end italic mt-3">Updated At: {{ moment(updated_at).format('MMMM D') }}</p>
    </div>
  </div>
</template>
