<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '../stores/userStore';
import router from '../router/index';

const store = useUserStore()
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  store.loadUser(user)
} else {
  router.push(`/login`)
}

</script>

<template>
  <NavBar class="h-[10%]" />
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>
